import { z } from 'zod';

export const RIB_REGEX = /^[0-9A-F]{8}$/;

export const transactionSchema = z.object({
  id: z.string().uuid(),
  uuid: z.object({
    sender: z.string().uuid(),
    recipient: z.string().uuid(),
  }),
  sender: z.string().regex(RIB_REGEX),
  recipient: z.string().regex(RIB_REGEX),
  amount: z.number().positive(),
}).required();