"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupBanksSockets = void 0;
const errors_handler_1 = require("@/sockets/shared/middlewares/errors.handler");
const schemas_validation_1 = require("@/sockets/shared/middlewares/schemas.validation");
const zod_1 = require("zod");
const transaction_1 = require("./controllers/transaction");
const bankHealthCheckSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
});
const setupBanksSockets = (io) => {
    io.of('/banks').on('connection', (socket) => {
        socket.data.io = io.of('/banks'); // ou socket.data.io = io si tu veux le root
        console.log('New connection to /banks namespace');
        socket.on('banks:transaction', (data, callback) => {
            (0, errors_handler_1.withErrorHandling)((0, schemas_validation_1.withValidation)(bankHealthCheckSchema, transaction_1.newTransaction))(data, socket, callback);
        });
    });
};
exports.setupBanksSockets = setupBanksSockets;
