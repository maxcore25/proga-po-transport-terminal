import { axiosInstance } from '@/shared/api';
import { transactionsSchema } from '../model/transaction.schema';

export const getTransactions = async () => {
  const { data } = await axiosInstance.get('/transactions');
  return transactionsSchema.parse(data);
};
