import { z } from 'zod';

export const branchSchema = z.object({
  id: z.uuid(),
  address: z.string(),
  rooms: z.number().nonnegative(),
  createdAt: z.iso.datetime({ offset: true }),
  updatedAt: z.iso.datetime({ offset: true }),
});

export type Branch = z.infer<typeof branchSchema>;

export const branchesSchema = z.array(branchSchema);
