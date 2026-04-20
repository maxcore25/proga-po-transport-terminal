import { z } from 'zod';

export const updateUserSchema = z
  .object({
    fullName: z.string(),
    username: z.string(),
    isAdmin: z.boolean(),
    isActive: z.boolean(),
  })
  .partial();

export type UpdateUserValues = z.infer<typeof updateUserSchema>;
