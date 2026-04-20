import { QUERY_KEYS } from '@/shared/config';
import { useQuery } from '@tanstack/react-query';
import { getCards } from '../api/get-cards.api';

export function useGetCards() {
  return useQuery({
    queryKey: [QUERY_KEYS.CARDS],
    queryFn: getCards,
  });
}
