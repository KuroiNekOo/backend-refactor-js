import { prisma } from '../../../config/database.js';

const PermissionsRepository = {

  async addPermissionsToUser(
    { userId, permissions },
  ) {
    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
        isActive: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Vérifier si les permissions sont valides
    const permissionsFound = await prisma.permission.findMany({
      where: {
        name: {
          in: permissions,
        },
        isActive: true,
      },
    });

    // Faire un tableau des permissions non présentes
    const permissionsNotFound = permissions.filter((permission) => {
      return !permissionsFound.some((p) => p.name === permission);
    });

    if (permissionsNotFound.length) {
      console.error('Invalid permissions :', permissionsNotFound);
    }

    // Ajouter les permissions à l'utilisateur
    return prisma.userPermission.createMany({
      data: permissionsFound.map((permission) => ({
        userId,
        permissionId: permission.id,
      })),
    });
  },

  async removePermissionsFromUser(
    { userId, permissions },
  ) {
    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
        isActive: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Vérifier si les permissions sont valides
    const permissionsFound = await prisma.permission.findMany({
      where: {
        name: {
          in: permissions,
        },
        isActive: true,
      },
    });

    // Faire un tableau des permissions non présentes
    const permissionsNotFound = permissions.filter((permission) => {
      return !permissionsFound.some((p) => p.name === permission);
    });

    if (permissionsNotFound.length) {
      console.error('Invalid permissions :', permissionsNotFound);
    }

    // Supprimer les permissions de l'utilisateur
    return prisma.userPermission.deleteMany({
      where: {
        userId,
        permissionId: {
          in: permissionsFound.map((permission) => permission.id),
        },
      },
    });
  },

};

export default PermissionsRepository;

