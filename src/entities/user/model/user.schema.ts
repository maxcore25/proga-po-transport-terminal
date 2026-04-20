import { z } from 'zod';

export const userSchema = z.object({
  id: z.uuid(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.email(),
  createdAt: z.iso.datetime({ offset: true }),
  updatedAt: z.iso.datetime({ offset: true }),
});

export const usersSchema = z.array(userSchema);

export type User = z.infer<typeof userSchema>;
