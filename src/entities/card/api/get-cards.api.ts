import { axiosInstance } from '@/shared/api';
import { cardsSchema } from '../model/card.schema';

export const getCards = async () => {
  const { data } = await axiosInstance.get('/cards');
  return cardsSchema.parse(data);
};
