import { axiosInstance } from '@/shared/api';

export type CreateTerminalRequestBody = {
  name: string;
  serialNumber: string;
  location: string;
  route?: string;
  isActive?: boolean;
  lastSeenAt?: string;
};

export const createTerminal = async (payload: CreateTerminalRequestBody) => {
  const { data } = await axiosInstance.post('/terminals', payload);
  return data;
};
