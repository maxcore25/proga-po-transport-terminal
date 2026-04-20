import { axiosInstance } from '@/shared/api';

export const deleteCard = async (id: string) => {
  await axiosInstance.delete(`/cards/${id}`);
};
