import dotenv from 'dotenv';
dotenv.config();
import { z } from 'zod';

const envSchema = z.object({
  HTTP_PORT: z.string().default('3000'),
  HTTP_DOMAIN: z.string(),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  SESSION_SECRET: z.string().min(10),
});

export const env = envSchema.parse(process.env);
