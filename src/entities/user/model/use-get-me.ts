import { useQuery } from '@tanstack/react-query';
import { getMe } from '../api/get-me.api';
import { QUERY_KEYS } from '@/shared/config';

export function useGetMe(enabled = true) {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_ME],
    queryFn: getMe,
    retry: false,
    enabled,
  });
}
