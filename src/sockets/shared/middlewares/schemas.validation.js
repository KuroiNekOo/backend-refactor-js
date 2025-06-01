import { ZodError } from 'zod';

export const withValidation = (schema, handler) => {
  console.log('withValidation middleware called');

  return async (data, socket, callback) => {
    try {
      // Vérification des paramètres
      if (!schema || typeof schema?.parse !== 'function') {
        console.error('Invalid schema provided:', schema);
        throw new Error('Invalid schema provided to withValidation');
      }

      if (typeof handler !== 'function') {
        throw new Error('Invalid handler provided to withValidation');
      }

      // Vérification de la connexion du socket
      if (!socket || !socket?.connected) {
        throw new Error('Socket is not connected');
      }

      // Vérification de la présence du callback
      if (typeof callback !== 'function') {
        throw new Error('Callback is not a function');
      }

      // Vérification de la présence des données
      if (!data) {
        throw new Error('No data provided');
      }

      // Si data est un json string, le parser
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch (error) {
          throw new Error('Invalid JSON string provided');
        }
      }

      // Validation des données avec Zod
      const parsedData = schema.parse(data);

      // Appel du gestionnaire avec les données validées
      await handler(parsedData, socket, callback);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Validation failed:', error.errors);

        // Retourne une réponse d'erreur au client
        if (typeof callback === 'function') {
          callback({
            type: 'validation_error',
            message: 'Validation failed',
            details: error.errors,
          });
        }
      } else {
        throw error; // Pour la gestion des autres erreurs, elles seront attrapées dans `withErrorHandling`
      }
    }
  };
};