import { Server as SocketIOServer } from 'socket.io';

export const createSocketServer = (httpServer) => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: true,
      credentials: true,
    },
  });

  return io;
};
