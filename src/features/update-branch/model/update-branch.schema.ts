import { z } from 'zod';

export const updateBranchSchema = z
  .object({
    address: z.string(),
    rooms: z.number().nonnegative(),
  })
  .partial();

export type UpdateBranchValues = z.infer<typeof updateBranchSchema>;
