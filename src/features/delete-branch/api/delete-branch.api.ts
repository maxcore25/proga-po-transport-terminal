import { axiosInstance } from '@/shared/api';

export const deleteBranch = async (id: string) => {
  const { data } = await axiosInstance.delete(`/branches/${id}`);
  return data;
};
