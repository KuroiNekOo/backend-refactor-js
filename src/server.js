import { env } from './config/env.js';
import http from 'http';
import { app } from './app/index.js';
import { initRedis, closeRedis } from './config/redis.js'; // Import Redis init/close
import { initSockets } from './sockets/index.js'; // Si tu utilises Socket.IO
import { connectDB, disconnectDB } from './config/database.js'; // Import Prisma DB connect/disconnect

const PORT = env.HTTP_PORT || 3000;
const DOMAIN = env.HTTP_DOMAIN || 'localhost';

// Création du serveur HTTP
const server = http.createServer(app);

// Setup des sockets si tu en utilises
initSockets(server);

// Démarrage du serveur
server.listen(PORT, async () => {
  console.log(`🚀 HTTP server listening on http://${DOMAIN}:${PORT}`);

  try {
    // Connexion à la base de données via Prisma
    await connectDB();
    console.log('✅ Base de données connectée avec succès');
  } catch (err) {
    console.error('❌ Échec de connexion à la base de données', err);
  }

  try {
    // Connexion à Redis
    await initRedis();
    console.log('✅ Redis connecté avec succès');
  } catch (err) {
    console.error('❌ Échec de connexion à Redis', err);
  }
});

// Gestion du shutdown propre
const gracefulShutdown = async () => {
  console.log('⏳ Fermeture du serveur...');

  try {
    // Déconnexion de la base de données via Prisma
    await disconnectDB();
    console.log('🧹 Base de données fermée proprement');
  } catch (err) {
    console.error('⚠️ Erreur pendant la fermeture de la base de données', err);
  }

  try {
    // Fermeture de Redis
    await closeRedis();
    console.log('🧹 Redis fermé proprement');
  } catch (err) {
    console.error('⚠️ Erreur pendant la fermeture de Redis', err);
  }

  process.exit(0);
};

// Gestion des signaux pour le shutdown
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

// export { server };
