import { axiosInstance } from '@/shared/api';

export const logout = async () => {
  const response = await axiosInstance.post('/auth/logout');
  return response.data;
};
