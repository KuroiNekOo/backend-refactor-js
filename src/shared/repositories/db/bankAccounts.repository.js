import { prisma } from '../../../config/database.js';

const bankAccountsRepository = {
  async transferFunds({ sender, recipient }) {
    const { id: senderRib, newSolde: senderSolde } = sender;
    const { id: recipientRib, newSolde: recipientSolde } = recipient;

    if (!senderRib || !recipientRib || senderSolde == null || recipientSolde == null) {
      throw new Error('Missing parameters: senderRib, recipientRib, senderSolde, or recipientSolde');
    }

    try {
      return await prisma.$transaction(async (prisma) => {
        await prisma.$executeRawUnsafe(`SET SESSION innodb_lock_wait_timeout = 1;`);

        const accountsResult = await prisma.$queryRaw`
          SELECT * FROM \`bank_account\`
          WHERE id IN (${senderRib}, ${recipientRib})
          FOR UPDATE;
        `;

        const senderAccount = accountsResult.find(acc => acc.id === senderRib);
        const recipientAccount = accountsResult.find(acc => acc.id === recipientRib);

        if (!senderAccount) {
          throw new Error('Sender account does not exist.');
        }

        if (!recipientAccount) {
          throw new Error('Recipient account does not exist.');
        }

        await prisma.bankAccount.update({
          where: { id: senderRib },
          data: { balance: senderSolde },
        });

        await prisma.bankAccount.update({
          where: { id: recipientRib },
          data: { balance: recipientSolde },
        });

        return true;
      });
    } catch (error) {
      // Erreur si il y a un verrouillage
      if (error.code === '55P03') {
        console.warn(`Verrou sur cet enregistrement : ${error.message}`);
        throw new Error('Transaction impossible, please retry later.');
      } else if (error.code === 'P2028') {
        console.warn(`Transaction impossible : le pool de connexions est déjà au complet.`);
        throw new Error('Transaction already in progress for these accounts, please retry later.');
      } else {
        console.error('Erreur réelle dans transferFunds:', error.message);
        throw error;
      }
    }
  },

  async transferFunds2({ accounts }) {
    if (!Array.isArray(accounts) || accounts.length === 0) {
      throw new Error('Accounts array is required and cannot be empty.');
    }

    try {
      return await prisma.$transaction(async (prisma) => {
        await prisma.$executeRawUnsafe(`SET SESSION innodb_lock_wait_timeout = 1;`);

        const accountIds = accounts.map(acc => acc.id);

        const accountsResult = await prisma.$queryRaw`
          SELECT * FROM \`bank_account\`
          WHERE id IN (${prisma.join(accountIds)})
          FOR UPDATE;
        `;

        // Vérifier que tous les comptes existent
        for (const { id } of accounts) {
          if (!accountsResult.find(acc => acc.id === id)) {
            throw new Error(`Account with RIB ${id} does not exist.`);
          }
        }

        // Mettre à jour tous les comptes
        for (const { id, newSolde } of accounts) {
          await prisma.bankAccount.update({
            where: { id },
            data: { balance: newSolde },
          });
        }

        return true;
      });
    } catch (error) {
      if (error.code === '55P03') {
        console.warn(`Verrou sur cet enregistrement : ${error.message}`);
        throw new Error('Transaction impossible, please retry later.');
      } else if (error.code === 'P2028') {
        console.warn(`Transaction impossible : le pool de connexions est déjà au complet.`);
        throw new Error('Transaction already in progress, please retry later.');
      } else {
        console.error('Erreur réelle dans transferFunds:', error.message);
        throw error;
      }
    }
  },
};

export default bankAccountsRepository;

