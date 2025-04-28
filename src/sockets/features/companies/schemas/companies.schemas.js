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

export const createCompanySchema = z.object({
  name: z.string().min(1).max(15),
  ownerId: z.string().uuid(),
}).strict();

export const updateCompanySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(15),
}).strict();

export const deleteCompanySchema = z.object({
  id: z.string().uuid(),
}).strict();

export const addPermissionsToPlayerSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  permissions: z.array(z.string()),
}).strict();

export const removePermissionsFromPlayerSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  permissions: z.array(z.string()),
}).strict();
