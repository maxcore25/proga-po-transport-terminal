import { QUERY_KEYS } from '@/shared/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTerminal } from '../api/delete-terminal.api';

export const useDeleteTerminal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.TERMINALS],
    mutationFn: deleteTerminal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TERMINALS],
      });
    },
  });
};
