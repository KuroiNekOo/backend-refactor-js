"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withValidation = void 0;
const zod_1 = require("zod");
const withValidation = (schema, handler) => {
    console.log('withValidation middleware called');
    return (data, socket, callback) => {
        try {
            // Validation des données avec Zod et typage strict
            const parsedData = schema.parse(data);
            // Appel du gestionnaire avec les données validées
            handler(parsedData, socket, callback);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                console.error('Validation failed:', error.errors);
                callback({
                    message: 'Validation failed',
                    details: error.errors,
                });
            }
            else {
                throw error; // Pour la gestion des autres erreurs, elles seront attrapées dans `withErrorHandling`
            }
        }
    };
};
exports.withValidation = withValidation;
