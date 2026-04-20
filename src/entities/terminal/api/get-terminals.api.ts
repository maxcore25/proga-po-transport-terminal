import { axiosInstance } from '@/shared/api';
import { terminalsSchema } from '../model/terminal.schema';

export const getTerminals = async () => {
  const { data } = await axiosInstance.get('/terminals');
  return terminalsSchema.parse(data);
};
