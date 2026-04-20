import { z } from 'zod';

export const createTerminalSchema = z.object({
  name: z.string().trim().min(2).max(100),
  serialNumber: z.string().trim().min(2).max(100),
  location: z.string().trim().min(2).max(200),
  route: z.string().optional(),
  isActive: z.boolean(),
  lastSeenAt: z.string().optional(),
});

export type CreateTerminalValues = z.infer<typeof createTerminalSchema>;
