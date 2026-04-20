import { z } from 'zod';

export const createBranchSchema = z.object({
  address: z.string(),
  rooms: z.number().nonnegative(),
});

export type CreateBranchValues = z.infer<typeof createBranchSchema>;
