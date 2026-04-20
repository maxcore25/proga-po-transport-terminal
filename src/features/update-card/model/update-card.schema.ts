import { z } from 'zod';

export const updateCardFormSchema = z.object({
  cardNumber: z.string().trim().min(4).max(64),
  ownerName: z.string().trim().min(2).max(100),
  keyId: z.guid(),
  balance: z.number().int().min(0),
  isBlocked: z.boolean(),
  blockReason: z.string(),
  expiresAt: z.string(),
});

export type UpdateCardFormValues = z.infer<typeof updateCardFormSchema>;
