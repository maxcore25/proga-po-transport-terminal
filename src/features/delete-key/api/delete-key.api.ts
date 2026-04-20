import { axiosInstance } from '@/shared/api';

export const deleteKey = async (id: string) => {
  await axiosInstance.delete(`/keys/${id}`);
};
