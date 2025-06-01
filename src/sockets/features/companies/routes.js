import { withErrorHandling } from '../../shared/middlewares/errors.handler.js';
import { withValidation } from '../../shared/middlewares/schemas.validation.js';
import CompaniesController from './controllers/compagnies.controller.js';
import {
  addPermissionsToPlayerSchema,
  createCompanySchema,
  deleteCompanySchema,
  dismissalSchema,
  recruitmentSchema,
  removePermissionsFromPlayerSchema,
  updateCompanySchema,
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

    socket.on(
      'create',
      (data, callback) => {
        const handler = withErrorHandling(
          withValidation(createCompanySchema, CompaniesController.createCompany)
        );

        // Appel explicite avec `socket`
        handler(data, socket, callback);
      }
    );

    socket.on(
      'create:confirmed',
      (data, callback) => {
        const handler = withErrorHandling(
          withValidation(createCompanySchema, CompaniesController.createCompanyConfirmed)
        );

        // Appel explicite avec `socket`
        handler(data, socket, callback);
      }
    );

    socket.on(
      'update',
      (data, callback) => {
        const handler = withErrorHandling(
          withValidation(updateCompanySchema, CompaniesController.updateCompany)
        );

        // Appel explicite avec `socket`
        handler(data, socket, callback);
      }
    );

    socket.on(
      'update:confirmed',
      (data, callback) => {
        const handler = withErrorHandling(
          withValidation(updateCompanySchema, CompaniesController.updateCompanyConfirmed)
        );

        // Appel explicite avec `socket`
        handler(data, socket, callback);
      }
    );

    socket.on(
      'delete',
      (data, callback) => {
        const handler = withErrorHandling(
          withValidation(deleteCompanySchema, CompaniesController.deleteCompany)
        );

        // Appel explicite avec `socket`
        handler(data, socket, callback);
      }
    );

    socket.on(
      'delete:confirmed',
      (data, callback) => {
        const handler = withErrorHandling(
          withValidation(deleteCompanySchema, CompaniesController.deleteCompanyConfirmed)
        );

        // Appel explicite avec `socket`
        handler(data, socket, callback);
      }
    );

    socket.on(
      'permission:add',
      (data, callback) => {
        const handler = withErrorHandling(
          withValidation(addPermissionsToPlayerSchema, CompaniesController.addPermissionsToPlayer)
        );

        // Appel explicite avec `socket`
        handler(data, socket, callback);
      }
    );

    socket.on(
      'permission:add:confirmed',
      (data, callback) => {
        const handler = withErrorHandling(
          withValidation(addPermissionsToPlayerSchema, CompaniesController.addPermissionsToPlayerConfirmed)
        );

        // Appel explicite avec `socket`
        handler(data, socket, callback);
      }
    );

    socket.on(
      'permission:remove',
      (data, callback) => {
        const handler = withErrorHandling(
          withValidation(removePermissionsFromPlayerSchema, CompaniesController.removePermissionsFromPlayer)
        );

        // Appel explicite avec `socket`
        handler(data, socket, callback);
      }
    );

    socket.on(
      'permission:remove:confirmed',
      (data, callback) => {
        const handler = withErrorHandling(
          withValidation(removePermissionsFromPlayerSchema, CompaniesController.removePermissionsFromPlayerConfirmed)
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