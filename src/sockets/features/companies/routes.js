import { withErrorHandling } from '../../shared/middlewares/errors.handler.js';
import { withValidation } from '../../shared/middlewares/schemas.validation.js';
import CompaniesController from './controllers/compagnies.controller.js';
import {
  dismissalSchema,
  recruitmentSchema,
} from './schemas/companies.schemas.js';

export const setupBanksSockets = (io) => {
  io.of('/companies').on('connection', (socket) => {
    socket.data.io = io.of('/companies'); // ou socket.data.io = io si tu veux le root
    console.log('New connection to /companies namespace');

    socket.on(
      'recruitment:send',
      (data, callback) => {
        const handler = withErrorHandling(
          withValidation(recruitmentSchema, CompaniesController.recruitmentSend)
        );

        // Appel explicite avec `socket`
        handler(data, socket, callback);
      }
    );

    socket.on(
      'recruitment:confirmed',
      (data, callback) => {
        const handler = withErrorHandling(
          withValidation(recruitmentSchema, CompaniesController.recruitmentConfirmed)
        );

        // Appel explicite avec `socket`
        handler(data, socket, callback);
      }
    );

    socket.on(
      'dismissal:send',
      (data, callback) => {
        const handler = withErrorHandling(
          withValidation(dismissalSchema, CompaniesController.dismissalSend)
        );

        // Appel explicite avec `socket`
        handler(data, socket, callback);
      }
    );

    socket.on(
      'dismissal:confirmed',
      (data, callback) => {
        const handler = withErrorHandling(
          withValidation(dismissalSchema, CompaniesController.dismissalConfirmed)
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
      console.log(`Client with ID < ${socket.id} > disconnected from /companies namespace with reason: ${reason}`);
    });

    // gestion basique de l'erreur
    socket.on('error', (error) => {
      console.error(`Socket error: ${error}`);
    });

  });
};