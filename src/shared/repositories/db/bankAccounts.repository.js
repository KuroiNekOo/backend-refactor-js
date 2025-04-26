// import { prisma } from '../../../config/database.js'; // Prisma Client

// // Repository pour gérer les utilisateurs
// const bankAccountsRepository = {

//   async transferFunds(
//     { sender: senderRib, recipient: recipientRib, amount }
//   ) {
//     if (!senderRib || !recipientRib || !amount) {
//       throw new Error('Missing parameters: senderRib, recipientRib, or amount');
//     }

//     try {
//       return prisma.$transaction(async (prisma) => {
//         // Configurer un délai d'attente pour les verrous (PostgreSQL uniquement)
//         // await prisma.$executeRaw`SET LOCAL lock_timeout = '5s';`;

//         // await prisma.$executeRaw`SET SESSION innodb_lock_wait_timeout = 1`;
//         await prisma.$executeRawUnsafe(`SET SESSION innodb_lock_wait_timeout = 5;`);

//         // Verrouiller le compte du sender
//           const senderAccountResult = await prisma.$queryRaw`
//           SELECT * FROM \`bank_account\`
//           WHERE id = ${senderRib}
//           FOR UPDATE;
//         `;
//         const senderAccount = senderAccountResult?.[0];

//         // Verrouiller le compte du recipient
//           const recipientAccountResult = await prisma.$queryRaw`
//           SELECT * FROM \`bank_account\`
//           WHERE id = ${recipientRib}
//           FOR UPDATE;
//         `;
//         const recipientAccount = recipientAccountResult?.[0];

//         // Vérifications
//         if (!senderAccount || senderAccount.balance < amount) {
//           throw new Error('Insufficient funds or sender account does not exist.');
//         }

//         if (!recipientAccount) {
//           throw new Error('Recipient account does not exist.');
//         }

//         // Mettre à jour le solde du sender
//         await prisma.bankAccount.update({
//           where: { id: senderRib },
//           data: { balance: senderAccount.balance - amount },
//         });

//         // Mettre à jour le solde du recipient
//         await prisma.bankAccount.update({
//           where: { id: recipientRib },
//           data: { balance: recipientAccount.balance + amount },
//         });

//         return true;
//       });
//     } catch (error) {
//       // Vérifier si l'erreur est liée à un verrouillage
//       if (error.code === '55P03') { // PostgreSQL error code for lock timeout
//         console.error('Conflit de verrouillage détecté :', error.message);
//       } else if (error.code === 'P2028') {
//         console.error('Toutes les connexions du pool en utilisation :', error.message);
//       } else {
//         console.error('Erreur lors de la transaction :', error.message);
//       }
//       throw error; // Relancer l'erreur pour la gestion en amont
//     }

//   },

// };

// export default bankAccountsRepository;

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
      if (error.code === 'P2028') {
        console.warn(`Transaction impossible : les comptes sont déjà verrouillés.`);
        throw new Error('Transaction already in progress for these accounts, please retry later.');
      } else {
        console.error('Erreur réelle dans transferFunds:', error.message);
        throw error;
      }
    }
  },
};

export default bankAccountsRepository;

