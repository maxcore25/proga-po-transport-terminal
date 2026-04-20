import { z } from 'zod';

export const userSchema = z.object({
  id: z.uuid(),
  fullName: z.string().min(1),
  username: z.string().min(1),
  isAdmin: z.boolean(),
  isActive: z.boolean(),
  createdAt: z.iso.datetime({ offset: true }),
  updatedAt: z.iso.datetime({ offset: true }),
});

export const usersSchema = z.array(userSchema);

export type User = z.infer<typeof userSchema>;
