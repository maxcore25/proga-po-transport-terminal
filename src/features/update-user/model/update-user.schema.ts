import { z } from 'zod';

export const updateUserSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    middleName: z.string(),
    email: z.email(),
  })
  .partial();

export type UpdateUserValues = z.infer<typeof updateUserSchema>;
