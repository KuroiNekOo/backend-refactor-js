import { z } from 'zod';

export const AUTH_CODE_REGEX = /^[A-F0-9]{8}$/;

export const signupStep1Schema = z.object({
  pseudo: z.string().min(1).max(20),
  uuid: z.string().uuid(),
});

export const signupStep2Schema = z.object({
  pseudo: z.string().min(1).max(20),
  uuid: z.string().uuid(),
  password: z.string().min(3).max(100),
  code: z.string().regex(AUTH_CODE_REGEX),
});