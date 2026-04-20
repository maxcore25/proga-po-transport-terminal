import { QUERY_KEYS } from '@/shared/config';
import { useQuery } from '@tanstack/react-query';
import { getBranches } from '../api/get-branches.api';

export function useGetBranches() {
  return useQuery({
    queryKey: [QUERY_KEYS.BRANCHES],
    queryFn: getBranches,
  });
}
