import { keyTypeSchema } from '@/entities/key';
import { z } from 'zod';

export const createKeySchema = z.object({
  name: z.string().trim().min(2).max(100),
  keyType: keyTypeSchema,
  keyValue: z.string().trim().min(12).max(128),
  description: z.string().optional(),
  isActive: z.boolean(),
  sector: z.number().int().min(0),
});

export type CreateKeyValues = z.infer<typeof createKeySchema>;
