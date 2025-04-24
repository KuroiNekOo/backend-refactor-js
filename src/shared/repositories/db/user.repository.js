import { prisma } from '../../../config/database.js'; // Prisma Client

// Repository pour gérer les utilisateurs
const userRepository = {

  // Récupérer un utilisateur par son ID
  async getUserById(userId) {
    return prisma.user.findUnique({
      where: { id: userId },
    });
  },

  // Créer un nouvel utilisateur
  async createUser(data) {
    return null;
  },

  // Mettre à jour un utilisateur
  async updateUser(userId, data) {
    return null;
  },

  // Supprimer un utilisateur
  async deleteUser(userId) {
    return prisma.user.delete({
      where: { id: userId },
    });
  },

};

export default userRepository;
