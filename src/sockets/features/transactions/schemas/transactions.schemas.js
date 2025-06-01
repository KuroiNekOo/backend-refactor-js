import { z } from 'zod';

export const RIB_REGEX = /^[0-9A-F]{8}$/;

export const transactionInitiateSchema = z.object({
  id: z.string().uuid(),
  transactions: z.array(z.object({
    from: z.string().regex(RIB_REGEX),
    to: z.string().regex(RIB_REGEX),
    amount: z.number().positive(),
  })),
});

export const transactionConfirmSchema = z.object({
  id: z.string().uuid(),
  transactions: z.array(z.object({
    from: z.string().regex(RIB_REGEX),
    to: z.string().regex(RIB_REGEX),
    amount: z.number().positive(),
  })),
});

export const transactionCancelSchema = z.object({
  id: z.string().uuid(),
  transactions: z.array(z.object({
    from: z.string().regex(RIB_REGEX),
    to: z.string().regex(RIB_REGEX),
    amount: z.number().positive(),
  })),
});

export const deleteBankAccountSchema = z.object({
  id: z.string().uuid(),
  rib: z.string().regex(RIB_REGEX),
});

export const createBankAccountSchema = z.object({
  id: z.string().uuid(),
  balance: z.number().positive(),
});

export const setDefaultBankAccountSchema = z.object({
  id: z.string().uuid(),
  rib: z.string().regex(RIB_REGEX),
});

export const setPriceFluctuationSchema = z.object({
  id: z.string().uuid(),
  itemBlockId: z.number().positive(),
  price: z.number().positive(),
});
