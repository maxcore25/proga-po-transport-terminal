import { QUERY_KEYS } from '@/shared/config';
import { useQuery } from '@tanstack/react-query';
import { getTransactions } from '../api/get-transactions.api';

export function useGetTransactions() {
  return useQuery({
    queryKey: [QUERY_KEYS.TRANSACTIONS],
    queryFn: getTransactions,
  });
}
