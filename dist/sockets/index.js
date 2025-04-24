"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSockets = void 0;
const socket_1 = require("@/config/socket");
// import { sessionMiddleware } from '@/config/session';
const routes_1 = require("./features/transactions/routes");
const initSockets = (httpServer) => {
    const io = (0, socket_1.createSocketServer)(httpServer);
    // io.use(sessionMiddleware);
    (0, routes_1.setupBanksSockets)(io);
    console.log('🧩 Socket.IO initialized');
};
exports.initSockets = initSockets;
