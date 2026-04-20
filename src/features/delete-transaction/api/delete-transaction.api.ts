import { axiosInstance } from '@/shared/api';

export const deleteTransaction = async (id: string) => {
  await axiosInstance.delete(`/transactions/${id}`);
};
