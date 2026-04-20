import { z } from 'zod';

export const createUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string().optional(),
  email: z.email(),
  password: z.string(),
});

export type CreateUserValues = z.infer<typeof createUserSchema>;
