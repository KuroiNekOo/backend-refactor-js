import { withErrorHandling } from '../../shared/middlewares/errors.handler.js';
import { withValidation } from '../../shared/middlewares/schemas.validation.js';
import authenticationController from './controllers/authentication.js';
import { changePasswordStep1Schema, changePasswordStep2Schema, signinSchema, signoutSchema, signupStep1Schema, signupStep2Schema } from './schemas/authentication.schemas.js';

export const setupAuthenticationSockets = (io) => {
  io.of('/authentication').on('connection', (socket) => {
    socket.data.io = io.of('/authentication'); // ou socket.data.io = io si tu veux le root
    console.log('New connection to /authentication namespace');

    socket.on(
      'signup:step1',
      (data, callback) => {
        const handler = withErrorHandling(
          withValidation(signupStep1Schema, authenticationController.signupStep1)
        );
    
        // Appel explicite avec `socket`
        handler(data, socket, callback);
      }
    );

    socket.on(
      'signup:step2',
      (data, callback) => {
        const handler = withErrorHandling(
          withValidation(signupStep2Schema, authenticationController.signupStep2)
        );
    
        // Appel explicite avec `socket`
        handler(data, socket, callback);
      }
    );

    socket.on(
      'changepassword:step1',
      (data, callback) => {
        const handler = withErrorHandling(
          withValidation(changePasswordStep1Schema, authenticationController.changePasswordStep1)
        );
    
        // Appel explicite avec `socket`
        handler(data, socket, callback);
      }
    );

    socket.on(
      'changepassword:step2',
      (data, callback) => {
        const handler = withErrorHandling(
          withValidation(changePasswordStep2Schema, authenticationController.changePasswordStep2)
        );
    
        // Appel explicite avec `socket`
        handler(data, socket, callback);
      }
    );

    socket.on(
      'signin',
      (data, callback) => {
        const handler = withErrorHandling(
          withValidation(signinSchema, authenticationController.signin)
        );
    
        // Appel explicite avec `socket`
        handler(data, socket, callback);
      }
    );

    socket.on(
      'signout',
      (data, callback) => {
        const handler = withErrorHandling(
          withValidation(signoutSchema, authenticationController.signout)
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
      console.log(`Client with ID < ${socket.id} > disconnected from /authentication namespace with reason: ${reason}`);
    });

    // gestion basique de l'erreur
    socket.on('error', (error) => {
      console.error(`Socket error: ${error}`);
    });

  });
};