import { QUERY_KEYS } from '@/shared/config';
import { useQuery } from '@tanstack/react-query';
import { getKeys } from '../api/get-keys.api';

export function useGetKeys() {
  return useQuery({
    queryKey: [QUERY_KEYS.KEYS],
    queryFn: getKeys,
  });
}
