import { QUERY_KEYS } from '@/shared/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBranch } from '../api/update-branch.api';
import { UpdateBranchValues } from './update-branch.schema';

export const useUpdateBranch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.BRANCHES],
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateBranchValues;
    }) => updateBranch(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.BRANCHES],
      });
    },
  });
};
