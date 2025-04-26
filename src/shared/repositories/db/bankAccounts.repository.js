import { prisma } from '../../../config/database.js'; // Prisma Client

// Repository pour gérer les utilisateurs
const bankAccountsRepository = {

  async transferFunds(
    { sender: senderRib, recipient: recipientRib, amount }
  ) {
    if (!senderRib || !recipientRib || !amount) {
      throw new Error('Missing parameters: senderRib, recipientRib, or amount');
    }

    try {
      return prisma.$transaction(async (prisma) => {
        // Configurer un délai d'attente pour les verrous (PostgreSQL uniquement)
        // await prisma.$executeRaw`SET LOCAL lock_timeout = '5s';`;

        // await prisma.$executeRaw`SET SESSION innodb_lock_wait_timeout = 1`;
        await prisma.$executeRawUnsafe(`SET SESSION innodb_lock_wait_timeout = 5;`);

        // Verrouiller le compte du sender
        const senderAccount = await prisma.$queryRaw`
          SELECT * FROM "bank_account"
          WHERE id = ${senderRib}
          FOR UPDATE;
        `;

        // Verrouiller le compte du recipient
        const recipientAccount = await prisma.$queryRaw`
          SELECT * FROM "bank_account"
          WHERE id = ${recipientRib}
          FOR UPDATE;
        `;

        // Vérifications
        if (!senderAccount || senderAccount.balance < amount) {
          throw new Error('Insufficient funds or sender account does not exist.');
        }

        if (!recipientAccount) {
          throw new Error('Recipient account does not exist.');
        }

        // Mettre à jour le solde du sender
        await prisma.bankAccount.update({
          where: { id: senderRib },
          data: { balance: senderAccount.balance - amount },
        });

        // Mettre à jour le solde du recipient
        await prisma.bankAccount.update({
          where: { id: recipientRib },
          data: { balance: recipientAccount.balance + amount },
        });

        return true;
      });
    } catch (error) {
      // Vérifier si l'erreur est liée à un verrouillage
      if (error.code === '55P03') { // PostgreSQL error code for lock timeout
        console.error('Conflit de verrouillage détecté :', error.message);
      } else {
        console.error('Erreur lors de la transaction :', error.message);
      }
      throw error; // Relancer l'erreur pour la gestion en amont
    }

  },

};

export default bankAccountsRepository;
