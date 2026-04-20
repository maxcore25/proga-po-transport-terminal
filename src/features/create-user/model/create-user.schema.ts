import { levels, roles } from '@/shared/config';
import { z } from 'zod';

export const createUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string().optional(),
  email: z.email(),
  password: z.string(),
  phone: z.string().optional(),
  role: z.enum(roles).optional(),
  knowledgeLevel: z.enum(levels),
  portfolio: z.string().optional(),
  rating: z.number().nonnegative().optional(),
  testimonialsCount: z.number().nonnegative().optional(),
});

export type CreateUserValues = z.infer<typeof createUserSchema>;
