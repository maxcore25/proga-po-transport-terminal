import { levels, roles } from '@/shared/config';
import { z } from 'zod';

export const userSchema = z.object({
  id: z.uuid(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  middleName: z.string().optional(),
  email: z.email(),
  phone: z.string().optional(),
  knowledgeLevel: z.enum(levels),
  role: z.enum(roles),
  createdAt: z.iso.datetime({ offset: true }),
  updatedAt: z.iso.datetime({ offset: true }),
  portfolio: z.string().optional(),
  rating: z.number().nonnegative().optional(),
  testimonialsCount: z.number().int().nonnegative().optional(),
});

export const usersSchema = z.array(userSchema);

export type User = z.infer<typeof userSchema>;
