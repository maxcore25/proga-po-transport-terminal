import { z } from 'zod';

export const updateTerminalFormSchema = z.object({
  name: z.string().trim().min(2).max(100),
  serialNumber: z.string().trim().min(2).max(100),
  location: z.string().trim().min(2).max(200),
  route: z.string(),
  isActive: z.boolean(),
  lastSeenAt: z.string(),
});

export type UpdateTerminalFormValues = z.infer<typeof updateTerminalFormSchema>;
