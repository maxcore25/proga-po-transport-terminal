import { QUERY_KEYS } from '@/shared/config';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../api/get-users.api';

export function useGetUsers() {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: getUsers,
  });
}
