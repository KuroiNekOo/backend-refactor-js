import { prisma } from '../../../config/database.js'; // Prisma Client

// Repository pour gérer les utilisateurs
const userRepository = {

  createUserAccount(data) {
    return prisma.user.create({
      data,
    });
  },

};

export default userRepository;
