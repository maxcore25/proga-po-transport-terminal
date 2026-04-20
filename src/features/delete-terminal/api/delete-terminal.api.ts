import { axiosInstance } from '@/shared/api';

export const deleteTerminal = async (id: string) => {
  await axiosInstance.delete(`/terminals/${id}`);
};
