import { transactionStatusSchema } from '@/entities/transaction';
import { z } from 'zod';

export const createTransactionSchema = z.object({
  amount: z.number().int().min(1),
  balanceBefore: z.number().int().min(0),
  balanceAfter: z.number().int().min(0),
  cardId: z.uuid(),
  terminalId: z.uuid(),
  status: transactionStatusSchema,
  declineReason: z.string().optional(),
});

export type CreateTransactionValues = z.infer<typeof createTransactionSchema>;
