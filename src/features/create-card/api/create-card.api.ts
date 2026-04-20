import { axiosInstance } from '@/shared/api';

export type CreateCardRequestBody = {
  cardNumber: string;
  ownerName: string;
  keyId: string;
  balance?: number;
  isBlocked?: boolean;
  blockReason?: string;
  expiresAt?: string;
};

export const createCard = async (payload: CreateCardRequestBody) => {
  const { data } = await axiosInstance.post('/cards', payload);
  return data;
};
