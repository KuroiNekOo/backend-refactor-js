import { createSocketServer } from '../config/socket.js';
// import { sessionMiddleware } from '@/config/session';
import { setupBanksSockets } from './features/transactions/routes.js';

export const initSockets = (httpServer) => {
  const io = createSocketServer(httpServer);

  // io.use(sessionMiddleware);

  setupBanksSockets(io);

  console.log('🧩 Socket.IO initialized');
};
