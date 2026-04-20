import { z } from 'zod';

export const cardSchema = z.object({
  id: z.guid(),
  cardNumber: z.string().min(1),
  ownerName: z.string().min(1),
  keyId: z.guid(),
  balance: z.number().int(),
  isBlocked: z.boolean(),
  blockReason: z.string().nullable().optional(),
  expiresAt: z.iso.datetime({ offset: true }).nullable().optional(),
  createdAt: z.iso.datetime({ offset: true }),
  updatedAt: z.iso.datetime({ offset: true }),
});

export const cardsSchema = z.array(cardSchema);

export type Card = z.infer<typeof cardSchema>;
