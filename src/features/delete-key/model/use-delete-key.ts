import { QUERY_KEYS } from '@/shared/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteKey } from '../api/delete-key.api';

export const useDeleteKey = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.KEYS],
    mutationFn: deleteKey,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.KEYS],
      });
    },
  });
};
