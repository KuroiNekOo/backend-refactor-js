// src/app/index.ts
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// import { sessionMiddleware } from '@/config/session';
// import { authenticateMiddleware } from './shared/middlewares/authenticate.middleware';
// import { errorsHandler } from './shared/middlewares/errorsHandler.middleware';
// import { swagger } from '@/docs/openapi';
// import { router } from './routers';

// Recréer __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Utile si t'as un reverse proxy (ex: nginx)
// app.set('trust proxy', 1);

// app.use(sessionMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(authenticateMiddleware);]

app.use(express.static(path.resolve(__dirname, '../public'))); // Serve les fichiers statiques

// if (process.env.NODE_ENV === 'development') {
//   app.use('/docs', express.static('docs')); // Swagger uniquement en dev
//   swagger(app);
// }

// app.use(router);

// app.use(errorsHandler);

export { app };
