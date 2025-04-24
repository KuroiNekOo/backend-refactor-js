import session from 'express-session';
import { getRedisClient, RedisStore } from './redis.js';
import { env } from './env.js';

const redisStore = new RedisStore({
  client: getRedisClient(),
  prefix: 'express_session_id:',
});

export const sessionMiddleware = session({
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: redisStore,
  cookie: {
    maxAge: 3600000,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  },
});
