import { z } from 'zod';

export const keySchema = z.object({
  id: z.uuid(),
  name: z.string().min(1),
  keyType: z.string().min(1),
  keyValue: z.string().min(1),
  sector: z.number().int(),
  description: z.string().nullable().optional(),
  isActive: z.boolean(),
  createdAt: z.iso.datetime({ offset: true }),
  updatedAt: z.iso.datetime({ offset: true }),
});

export const keysSchema = z.array(keySchema);

export type Key = z.infer<typeof keySchema>;
