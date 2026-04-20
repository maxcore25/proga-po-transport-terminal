import { axiosInstance } from '@/shared/api';
import { UpdateUserValues } from '../model/update-user.schema';

export const updateUser = async (id: string, payload: UpdateUserValues) => {
  const { data } = await axiosInstance.patch(`/users/${id}`, payload);
  return data;
};
