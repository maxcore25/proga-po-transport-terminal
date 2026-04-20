import { axiosInstance } from '@/shared/api';

export type UpdateTerminalRequestBody = {
  name?: string;
  serialNumber?: string;
  location?: string;
  route?: string;
  isActive?: boolean;
  lastSeenAt?: string;
};

export const updateTerminal = async (
  id: string,
  payload: UpdateTerminalRequestBody
) => {
  const { data } = await axiosInstance.patch(`/terminals/${id}`, payload);
  return data;
};
