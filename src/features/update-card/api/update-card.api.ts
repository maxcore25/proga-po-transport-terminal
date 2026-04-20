import { axiosInstance } from '@/shared/api';

export type UpdateCardRequestBody = {
  cardNumber?: string;
  ownerName?: string;
  keyId?: string;
  balance?: number;
  isBlocked?: boolean;
  blockReason?: string;
  expiresAt?: string;
};

export const updateCard = async (
  id: string,
  payload: UpdateCardRequestBody
) => {
  const { data } = await axiosInstance.patch(`/cards/${id}`, payload);
  return data;
};
