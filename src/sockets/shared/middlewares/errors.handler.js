export const withErrorHandling = (handler) => {
  console.log('withErrorHandling middleware initialized');

  return async (data, socket, callback) => {
    try {
      // Validation des paramètres
      if (!data || typeof callback !== 'function') {
        throw new Error('Invalid arguments passed to the handler');
      }

      // Verifier si le socket est connecté
      if (!socket || !socket?.connected) {
        throw new Error('Socket is not connected');
      }

      // Vérification de handler
      if (typeof handler !== 'function') {
        throw new Error('Invalid handler provided to withErrorHandling');
      }

      // Appel de la logique métier
      await handler(data, socket, callback);
    } catch (error) {
      console.error('Error during socket event:', {
        message: error.message,
        stack: error.stack,
        data,
      });

      // Retourne une réponse d'erreur au client
      if (typeof callback === 'function') {
        callback({
          type: 'error',
          message: error.message || 'An unexpected error occurred.',
          success: false,
        });
      }
    }
  };
};