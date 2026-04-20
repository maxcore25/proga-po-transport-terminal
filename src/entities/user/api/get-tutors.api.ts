import { axiosInstance } from '@/shared/api';
import { usersSchema } from '../model/user.schema';

export const getTutors = async () => {
  const { data } = await axiosInstance.get('/users?role=tutor');
  return usersSchema.parse(data);
};
