import { QUERY_KEYS } from '@/shared/config';
import { useQuery } from '@tanstack/react-query';
import { getTerminals } from '../api/get-terminals.api';

export function useGetTerminals() {
  return useQuery({
    queryKey: [QUERY_KEYS.TERMINALS],
    queryFn: getTerminals,
  });
}
