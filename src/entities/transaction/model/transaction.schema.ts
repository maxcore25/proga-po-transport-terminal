import { z } from 'zod';

export const transactionStatusSchema = z.enum(['approved', 'declined']);

export const transactionSchema = z.object({
  id: z.uuid(),
  amount: z.number().int(),
  balanceBefore: z.number().int(),
  balanceAfter: z.number().int(),
  cardId: z.uuid(),
  terminalId: z.uuid(),
  status: transactionStatusSchema,
  declineReason: z.string().nullable().optional(),
  createdAt: z.iso.datetime({ offset: true }),
});

export const transactionsSchema = z.array(transactionSchema);

export type Transaction = z.infer<typeof transactionSchema>;
