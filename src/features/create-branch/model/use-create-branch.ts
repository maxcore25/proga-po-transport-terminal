import { QUERY_KEYS } from '@/shared/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBranch } from '../api/create-branch.api';

export const useCreateBranch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.BRANCHES],
    mutationFn: createBranch,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.BRANCHES],
      });
    },
  });
};
