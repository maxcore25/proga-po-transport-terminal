import { axiosInstance } from '@/shared/api';
import { LoginFormValues, LoginResponse } from '../model/login.schema';

export const login = async (data: LoginFormValues) => {
  const response = await axiosInstance.post<LoginResponse>('/auth/login', data);
  return response.data;
};
