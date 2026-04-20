import { QUERY_KEYS } from '@/shared/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBranch } from '../api/delete-branch.api';

export const useDeleteBranch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.BRANCHES],
    mutationFn: deleteBranch,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.BRANCHES],
      });
    },
  });
};
