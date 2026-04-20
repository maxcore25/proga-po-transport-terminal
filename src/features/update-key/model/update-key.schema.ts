import { keyTypeSchema } from '@/entities/key';
import { z } from 'zod';

export const updateKeyFormSchema = z.object({
  name: z.string().trim().min(2).max(100),
  keyType: keyTypeSchema,
  keyValue: z.string().trim().min(12).max(128),
  sector: z.number().int().min(0),
  description: z.string(),
  isActive: z.boolean(),
});

export type UpdateKeyFormValues = z.infer<typeof updateKeyFormSchema>;
