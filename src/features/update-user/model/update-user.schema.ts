import { levels, roles } from '@/shared/config';
import { z } from 'zod';

export const updateUserSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    middleName: z.string(),
    email: z.email(),
    phone: z.string(),
    knowledgeLevel: z.enum(levels),
    portfolio: z.string(),
    rating: z.number().nonnegative(),
    role: z.enum(roles),
    testimonialsCount: z.number().nonnegative(),
  })
  .partial();

export type UpdateUserValues = z.infer<typeof updateUserSchema>;
