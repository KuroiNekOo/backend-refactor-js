import { prisma } from '../../../config/database.js';
import { RIB_REGEX } from '../../../sockets/features/transactions/schemas/transactions.schemas.js';
import RandExp from 'randexp';

async function generateNewRib() {
  // Generer le rib avec randexp
  const rib = new RandExp(RIB_REGEX).gen();

  // Vérifier si le rib existe déjà dans la base de données
  const existingAccount = await prisma.bankAccount.findUnique({
    where: { id: rib },
  });

  if (existingAccount) {
    // Si le rib existe déjà, générer un nouveau rib
    return generateNewRib();
  }

  // Si le rib n'existe pas, le retourner
  return rib;
}

const bankAccountsRepository = {

  async transferFunds({ transactions }) {
    if (!Array.isArray(transactions) || transactions.length === 0) {
      throw new Error('Transactions array is required and cannot be empty.');
    }

    // Résultats des mises à jour
    const successfulUpdates = [];
    const failedAccounts = [];

    // Boucle sur chaque compte et traitement séquentiel
    for (const { from, to, amount } of transactions) {
      try {
        // Effectuer une transaction pour chaque compte
        const result = await prisma.$transaction(async (prisma) => {

          // Cette ligne permet de réduire le temps d'attente pour les verrous InnoDB
          // à 1 seconde pour éviter les blocages prolongés
          await prisma.$executeRawUnsafe(`SET SESSION innodb_lock_wait_timeout = 1;`);

          // Vérifier que le compte from existe
          const fromAccount = await prisma.$queryRaw`
            SELECT * FROM \`bank_account\`
            WHERE id = ${from}
            FOR UPDATE;
          `;

          if (!fromAccount || fromAccount.length === 0) {
            throw new Error(`Account with RIB ${from} does not exist.`);
          }

          // Vérifier que le compte to existe
          const toAccount = await prisma.$queryRaw`
            SELECT * FROM \`bank_account\`
            WHERE id = ${to}
            FOR UPDATE;
          `;

          if (!toAccount || toAccount.length === 0) {
            throw new Error(`Account with RIB ${to} does not exist.`);
          }

          // Vérifier que le solde du compte from est suffisant
          const fromSolde = fromAccount[0].balance;
          const toSolde = toAccount[0].balance;

          if (fromSolde < amount) {
            throw new Error(`Insufficient balance in account ${from}. Current balance: ${fromSolde}, required: ${amount}.`);
          }

          // Mettre à jour le solde du compte from
          await prisma.bankAccount.update({
            where: { id: from },
            data: {
              balance: fromSolde - amount,
              updatedAt: new Date(),
            },
          });

          console.log(`Account ${from} updated successfully.`);

          // Mettre à jour le solde du compte to
          await prisma.bankAccount.update({
            where: { id: to },
            data: {
              balance: toSolde + amount,
              updatedAt: new Date(),
            },
          });

          console.log(`Account ${to} updated successfully.`);

          return { from, to, amount, success: true };
        });

        successfulUpdates.push(result);
      } catch (error) {
        // Gestion de l'erreur pour ce compte
        console.error(`Error with from account ${from} and to account ${to}: ${error.message}`);
        failedAccounts.push({ from, to, amount, success: false, error: error.message });
      }
    }

    // Retourner les résultats
    return { successfulUpdates, failedAccounts };
  },

  async createBankAccount(
    { uuid, balance, ownerType, isDefault }
  ) {
    const rib = await generateNewRib();

    if (!rib) {
      throw new Error('Failed to generate a new RIB.');
    }

    return prisma.bankAccount.create({
      data: {
        id: rib,
        userId: ownerType === 'USER' ? uuid : null,
        companyId: ownerType === 'COMPANY' ? uuid : null,
        balance,
        isDefault,
      },
    });
  },

  deleteBankAccount({ rib }) {
    return prisma.bankAccount.delete({
      where: { id: rib },
    });
  },

  async setDefaultBankAccount({ rib }) {
    const bankAccount = await prisma.bankAccount.findUnique({
      where: { id: rib },
    });

    if (!bankAccount) {
      throw new Error('Bank account not found.');
    }

    // Mettre à jour tous les autres comptes pour qu'ils ne soient pas par défaut
    await prisma.bankAccount.updateMany({
      where: {
        userId: bankAccount.userId,
        isDefault: true,
        id: { not: rib },
      },
      data: {
        isDefault: false,
        updatedAt: new Date(),
      },
    });

    return prisma.bankAccount.update({
      where: { id: rib },
      data: {
        isDefault: true,
        updatedAt: new Date(),
      },
    });
  },

};

export default bankAccountsRepository;

