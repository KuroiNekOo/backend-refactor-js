import { z } from 'zod';

export const RIB_REGEX = /^[0-9A-F]{8}$/;

export const transactionSchema = z.object({
  id: z.string().uuid(),
  uuid: z.object({
    sender: z.string().uuid(),
    recipient: z.string().uuid(),
  }),
  sender: z.object({
    id: z.string().regex(RIB_REGEX),
    newSolde: z.number().positive(),
  }),
  recipient: z.object({
    id: z.string().regex(RIB_REGEX),
    newSolde: z.number().positive(),
  }),
}).required();