import { axiosInstance } from '@/shared/api';

export const deleteUser = async (id: string) => {
  const { data } = await axiosInstance.delete(`/users/${id}`);
  return data;
};
