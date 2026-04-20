import { axiosInstance } from '@/shared/api';

export type CreateKeyRequestBody = {
  name: string;
  keyType: 'A' | 'B';
  keyValue: string;
  description?: string;
  isActive?: boolean;
  sector?: number;
};

export const createKey = async (payload: CreateKeyRequestBody) => {
  const { data } = await axiosInstance.post('/keys', payload);
  return data;
};
