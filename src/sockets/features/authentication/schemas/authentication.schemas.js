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

export const changePasswordStep1Schema = z.object({
  pseudo: z.string().min(1).max(20),
});

export const changePasswordStep2Schema = z.object({
  uuid: z.string().uuid(),
  password: z.string().min(3).max(100),
  code: z.string().regex(AUTH_CODE_REGEX),
});

export const signinSchema = z.object({
  uuid: z.string().uuid(),
});

export const signoutSchema = z.object({
  uuid: z.string().uuid(),
});
