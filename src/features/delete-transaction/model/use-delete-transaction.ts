import { QUERY_KEYS } from '@/shared/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTransaction } from '../api/delete-transaction.api';

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.TRANSACTIONS],
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TRANSACTIONS],
      });
    },
  });
};
