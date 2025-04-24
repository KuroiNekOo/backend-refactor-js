"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withErrorHandling = void 0;
const withErrorHandling = (handler) => {
    console.log('withErrorHandling middleware called');
    return (data, socket, callback) => {
        try {
            // Appel de la logique métier
            handler(data, socket, callback);
        }
        catch (error) {
            console.error('Error during socket event:', error);
            callback({
                type: 'error',
                message: 'An error occurred while processing your request.',
            });
        }
    };
};
exports.withErrorHandling = withErrorHandling;
