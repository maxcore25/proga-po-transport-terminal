import { axiosInstance } from '@/shared/api';
import { usersSchema } from '../model/user.schema';

export const getUsers = async () => {
  const { data } = await axiosInstance.get('/users');
  return usersSchema.parse(data);
};
