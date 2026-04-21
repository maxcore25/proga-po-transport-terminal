import { z } from 'zod';

export const keyLoadSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  keyType: z.string().min(1),
  keyValue: z.string().min(1),
  sector: z.number().int(),
});

export const keysLoadResponseSchema = z.object({
  issuedAt: z.string().min(1),
  count: z.number().int(),
  keys: z.array(keyLoadSchema),
});

export const paymentAuthResponseSchema = z.object({
  approved: z.boolean(),
  code: z.string().min(1),
  message: z.string().min(1),
  processedAt: z.string().optional(),
  transactionId: z.string().optional(),
  balanceAfter: z.number().int().optional(),
});

export type KeyLoad = z.infer<typeof keyLoadSchema>;
export type KeysLoadResponse = z.infer<typeof keysLoadResponseSchema>;
export type PaymentAuthResponse = z.infer<typeof paymentAuthResponseSchema>;
