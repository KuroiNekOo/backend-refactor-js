import { prisma } from '../../../config/database.js'; // Prisma Client

// Repository pour gérer les utilisateurs
const bankAccountsRepository = {

  updateBankAccount(
    id, data = {},
  ) {
    if (!id) {
      throw new Error('Missing id parameter');
    }

    return prisma.bankAccount.update({
      where: {
        id,
      },
      data,
    });

  },

};

export default bankAccountsRepository;
