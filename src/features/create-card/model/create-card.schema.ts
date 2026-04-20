import { z } from 'zod';

export const createCardSchema = z.object({
  cardNumber: z.string().trim().min(4).max(64),
  ownerName: z.string().trim().min(2).max(100),
  keyId: z.uuid(),
  balance: z.number().int().min(0),
  isBlocked: z.boolean(),
  blockReason: z.string().optional(),
  expiresAt: z.string().optional(),
});

export type CreateCardValues = z.infer<typeof createCardSchema>;
