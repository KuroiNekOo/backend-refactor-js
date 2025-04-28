import { z } from 'zod';

export const RIB_REGEX = /^[0-9A-F]{8}$/;

export const transactionInitiateSchema = z.object({
  id: z.string().uuid(),
  accounts: z.array(z.object({
    id: z.string().regex(RIB_REGEX),
    newSolde: z.number().positive(),
  })),
}).required();

export const transactionConfirmSchema = z.object({
  id: z.string().uuid(),
  accounts: z.array(z.object({
    id: z.string().regex(RIB_REGEX),
    newSolde: z.number().positive(),
  })),
}).required();

export const transactionCancelSchema = z.object({
  id: z.string().uuid(),
  accounts: z.array(z.object({
    id: z.string().regex(RIB_REGEX),
    newSolde: z.number().positive(),
  })),
}).required();

export const deleteBankAccountSchema = z.object({
  id: z.string().uuid(),
  rib: z.string().regex(RIB_REGEX),
}).required();

export const createBankAccountSchema = z.object({
  id: z.string().uuid(),
  balance: z.number().positive(),
}).required();

export const setDefaultBankAccountSchema = z.object({
  id: z.string().uuid(),
  rib: z.string().regex(RIB_REGEX),
}).required();

export const setPriceFluctuationSchema = z.object({
  id: z.string().uuid(),
  itemBlockId: z.number().positive(),
  price: z.number().positive(),
}).required();
