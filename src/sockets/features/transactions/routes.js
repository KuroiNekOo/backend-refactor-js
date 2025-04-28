import { withErrorHandling } from '../../shared/middlewares/errors.handler.js';
import { withValidation } from '../../shared/middlewares/schemas.validation.js';
import transactionController from './controllers/transaction.js';
import {
  createBankAccountSchema,
  deleteBankAccountSchema,
  setDefaultBankAccountSchema,
  setPriceFluctuationSchema,
  transactionConfirmSchema, 
  transactionInitiateSchema,
} from './schemas/transactions.schemas.js';

export const setupBanksSockets = (io) => {
  io.of('/banks').on('connection', (socket) => {
    socket.data.io = io.of('/banks'); // ou socket.data.io = io si tu veux le root
    console.log('New connection to /banks namespace');

    // Gestion de l'événement "banks:transaction"
    // socket.on(
    //   'transaction:confirm',
    //   (data, callback) => {
    //     const handler = withErrorHandling(
    //       withValidation(transactionSchema, transactionController.newTransaction)
    //     );
    
    //     // Appel explicite avec `socket`
    //     handler(data, socket, callback);
    //   }
    // );

    socket.on(
      'transaction:initiate',
      (data, callback) => {
        const handler = withErrorHandling(
          withValidation(transactionInitiateSchema, transactionController.transactionInitiate)
        );
    
        // Appel explicite avec `socket`
        handler(data, socket, callback);
      }
    );

    socket.on(
      'transaction:confirm',
      (data, callback) => {
        const handler = withErrorHandling(
          withValidation(transactionConfirmSchema, transactionController.transactionConfirm)
        );
    
        // Appel explicite avec `socket`
        handler(data, socket, callback);
      }
    );

    socket.on(
      'account:create',
      (data, callback) => {
        const handler = withErrorHandling(
          withValidation(createBankAccountSchema, transactionController.createBankAccount)
        );
    
        // Appel explicite avec `socket`
        handler(data, socket, callback);
      }
    );

    socket.on(
      'account:delete',
      (data, callback) => {
        const handler = withErrorHandling(
          withValidation(deleteBankAccountSchema, transactionController.deleteBankAccount)
        );
    
        // Appel explicite avec `socket`
        handler(data, socket, callback);
      }
    );

    socket.on(
      'account:setdefault',
      (data, callback) => {
        const handler = withErrorHandling(
          withValidation(setDefaultBankAccountSchema, transactionController.setDefaultBankAccount)
        );
    
        // Appel explicite avec `socket`
        handler(data, socket, callback);
      }
    );

    socket.on(
      'setpricefluctuation',
      (data, callback) => {
        const handler = withErrorHandling(
          withValidation(setPriceFluctuationSchema, transactionController.setPriceFluctuation)
        );
    
        // Appel explicite avec `socket`
        handler(data, socket, callback);
      }
    );

    // Gestion de l'événement juste avant la déconnexion
    socket.on('disconnecting', (reason) => {
      console.log(`Client is disconnecting. Reason: ${reason}`);
    });

    // Gestion de la déconnexion
    socket.on('disconnect', (reason) => {
      console.log(`Client with ID < ${socket.id} > disconnected from /banks namespace with reason: ${reason}`);
    });

    // gestion basique de l'erreur
    socket.on('error', (error) => {
      console.error(`Socket error: ${error}`);
    });

  });
};