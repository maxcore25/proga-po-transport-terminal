import { axiosInstance } from '@/shared/api';
import { keysSchema } from '../model/key.schema';

export const getKeys = async () => {
  const { data } = await axiosInstance.get('/keys');
  return keysSchema.parse(data);
};
