"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./config/env");
const http_1 = __importDefault(require("http"));
const app_1 = require("./app");
const redis_1 = require("./config/redis"); // Import Redis init/close
const sockets_1 = require("./sockets"); // Si tu utilises Socket.IO
const database_1 = require("./config/database"); // Import Prisma DB connect/disconnect
const PORT = env_1.env.HTTP_PORT || 3000;
const DOMAIN = env_1.env.HTTP_DOMAIN || 'localhost';
// Création du serveur HTTP
const server = http_1.default.createServer(app_1.app);
// Setup des sockets si tu en utilises
(0, sockets_1.initSockets)(server);
// Démarrage du serveur
server.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`🚀 HTTP server listening on http://${DOMAIN}:${PORT}`);
    try {
        // Connexion à la base de données via Prisma
        yield (0, database_1.connectDB)();
        console.log('✅ Base de données connectée avec succès');
    }
    catch (err) {
        console.error('❌ Échec de connexion à la base de données', err);
    }
    try {
        // Connexion à Redis
        yield (0, redis_1.initRedis)();
        console.log('✅ Redis connecté avec succès');
    }
    catch (err) {
        console.error('❌ Échec de connexion à Redis', err);
    }
}));
// Gestion du shutdown propre
const gracefulShutdown = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('⏳ Fermeture du serveur...');
    try {
        // Déconnexion de la base de données via Prisma
        yield (0, database_1.disconnectDB)();
        console.log('🧹 Base de données fermée proprement');
    }
    catch (err) {
        console.error('⚠️ Erreur pendant la fermeture de la base de données', err);
    }
    try {
        // Fermeture de Redis
        yield (0, redis_1.closeRedis)();
        console.log('🧹 Redis fermé proprement');
    }
    catch (err) {
        console.error('⚠️ Erreur pendant la fermeture de Redis', err);
    }
    process.exit(0);
});
// Gestion des signaux pour le shutdown
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
// export { server };
