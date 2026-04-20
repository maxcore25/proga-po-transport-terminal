import { axiosInstance } from '@/shared/api';
import { userSchema } from '../model/user.schema';

export const getMe = async () => {
  const { data } = await axiosInstance.get('/users/me');
  return userSchema.parse(data);
};
