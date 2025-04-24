"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// src/app/index.ts
const express_1 = __importDefault(require("express"));
const node_path_1 = __importDefault(require("node:path"));
// import { sessionMiddleware } from '@/config/session';
// import { authenticateMiddleware } from './shared/middlewares/authenticate.middleware';
// import { errorsHandler } from './shared/middlewares/errorsHandler.middleware';
// import { swagger } from '@/docs/openapi';
// import { router } from './routers';
const app = (0, express_1.default)();
exports.app = app;
// Utile si t'as un reverse proxy (ex: nginx)
// app.set('trust proxy', 1);
// app.use(sessionMiddleware);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use(authenticateMiddleware);]
app.use(express_1.default.static(node_path_1.default.resolve(__dirname, '../public'))); // Serve les fichiers statiques
