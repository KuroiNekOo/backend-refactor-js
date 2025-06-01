import { PrismaClient } from '../../prisma/generated/client/index.js';

// Initialisation de Prisma Client
const prisma = new PrismaClient();

// Connexion à la base de données
const connectDB = async () => {
  try {
    await prisma.$connect();
    // console.log('Connected to the database successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Déconnexion propre de la base
const disconnectDB = async () => {
  await prisma.$disconnect();
};

// Exportation de Prisma pour utilisation dans d'autres modules
export { prisma, connectDB, disconnectDB };
