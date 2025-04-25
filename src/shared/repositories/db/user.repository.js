import { prisma } from '../../../config/database.js'; // Prisma Client

// Repository pour gérer les utilisateurs
const userRepository = {

  createUserAccount(data) {
    return prisma.user.create({
      data,
    });
  },

  updateUserAccount(data) {
    const id = data?.id;

    if (!id) {
      throw new Error('User ID is required for update');
    }

    return prisma.user.update({
      where: {
        id,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  },

  getUserByPseudo(pseudo) {
    return prisma.user.findFirst({
      where: {
        name: {
          equals: pseudo, // Comparaison stricte (case-sensitive)
        },
      },
    });
  },

  generateSession(uuid) {
    return prisma.user.findFirst({
      where: {
        id: uuid,
        isActive: true,
      },
      include: {
        bankAccounts: {
          include: {
            transactionsAsReceiver: true,
            transactionsAsSender: true,
          },
        },
        drivePurchases: {
          include: {
            items: {
              include: {
                itemBlock: true,
              },
            },
          },
        },
        userCompanies: true,
        userPermissions: true,
        userRoles: true,
      },
    });
  },

};

export default userRepository;
