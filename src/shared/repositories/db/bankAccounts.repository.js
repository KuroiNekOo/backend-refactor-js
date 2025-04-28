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

  async transferFunds({ accounts }) {
    if (!Array.isArray(accounts) || accounts.length === 0) {
      throw new Error('Accounts array is required and cannot be empty.');
    }

    // Résultats des mises à jour
    const successfulUpdates = [];
    const failedAccounts = [];

    // Boucle sur chaque compte et traitement séquentiel
    for (const { id, newSolde } of accounts) {
      try {
        // Effectuer une transaction pour chaque compte
        const result = await prisma.$transaction(async (prisma) => {
          await prisma.$executeRawUnsafe(`SET SESSION innodb_lock_wait_timeout = 1;`);

          // Vérifier que le compte existe
          const accountResult = await prisma.$queryRaw`
            SELECT * FROM \`bank_account\`
            WHERE id = ${id}
            FOR UPDATE;
          `;

          if (!accountResult || accountResult.length === 0) {
            throw new Error(`Account with RIB ${id} does not exist.`);
          }

          // Mettre à jour le solde du compte
          await prisma.bankAccount.update({
            where: { id },
            data: {
              balance: newSolde,
              updatedAt: new Date(),
            },
          });

          console.log(`Account ${id} updated successfully.`);

          return { id, success: true };
        });

        successfulUpdates.push(result);
      } catch (error) {
        // Gestion de l'erreur pour ce compte
        console.error(`Error with account ${id}: ${error.message}`);
        failedAccounts.push({ id, success: false, error: error.message });
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

