import { z } from "zod"

export const recruitmentSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  userId: z.string().uuid(),
  status: z.enum(['OWNER', 'EMPLOYEE']),
}).strict();

export const dismissalSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  userId: z.string().uuid(),
}).strict();
