import { z } from 'zod';

export const terminalSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1),
  serialNumber: z.string().min(1),
  location: z.string().min(1),
  route: z.string().nullable().optional(),
  isActive: z.boolean(),
  lastSeenAt: z.iso.datetime({ offset: true }).nullable().optional(),
  createdAt: z.iso.datetime({ offset: true }),
  updatedAt: z.iso.datetime({ offset: true }),
});

export const terminalsSchema = z.array(terminalSchema);

export type Terminal = z.infer<typeof terminalSchema>;
