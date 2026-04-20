import { axiosInstance } from '@/shared/api';

export type UpdateKeyRequestBody = {
  name?: string;
  keyType?: 'A' | 'B';
  keyValue?: string;
  sector?: number;
  description?: string;
  isActive?: boolean;
};

export const updateKey = async (id: string, payload: UpdateKeyRequestBody) => {
  const { data } = await axiosInstance.patch(`/keys/${id}`, payload);
  return data;
};
