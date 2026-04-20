import { passwordSchema } from '@/features/login/model/login.schema';
import { z } from 'zod';

export const createUserSchema = z.object({
  fullName: z.string().trim(),
  username: z.string().trim(),
  password: passwordSchema,
  isAdmin: z.boolean(),
});

export type CreateUserValues = z.infer<typeof createUserSchema>;
