"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupUserSockets = void 0;
const errors_handler_1 = require("@/sockets/shared/middlewares/errors.handler");
const schemas_validation_1 = require("@/sockets/shared/middlewares/schemas.validation");
const zod_1 = require("zod");
const updateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
});
const setupUserSockets = (io) => {
    io.of('/users').on('connection', (socket) => {
        console.log('👤 New user connected via WebSocket');
        socket.on('user:update', (0, errors_handler_1.withErrorHandling)((0, schemas_validation_1.withValidation)(updateUserSchema, (data) => console.log('User updated:', data))));
    });
};
exports.setupUserSockets = setupUserSockets;
