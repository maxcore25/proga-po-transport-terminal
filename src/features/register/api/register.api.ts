import { axiosInstance } from '@/shared/api';
import { RegisterFormValues, RegisterResponse } from '../model/register.schema';

export const register = async (data: RegisterFormValues) => {
  const response = await axiosInstance.post<RegisterResponse>(
    '/auth/register',
    data
  );
  return response.data;
};
