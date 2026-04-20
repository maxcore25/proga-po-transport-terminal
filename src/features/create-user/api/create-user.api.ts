import { axiosInstance } from '@/shared/api';
import { CreateUserValues } from '../model/create-user.schema';

export const createUser = async (payload: CreateUserValues) => {
  const { data } = await axiosInstance.post('/users', payload);
  return data;
};
