import { axiosInstance } from '@/shared/api';

export type CreateTransactionRequestBody = {
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  cardId: string;
  terminalId: string;
  status: 'approved' | 'declined';
  declineReason?: string;
};

export const createTransaction = async (
  payload: CreateTransactionRequestBody
) => {
  const { data } = await axiosInstance.post('/transactions', payload);
  return data;
};
