import { QUERY_KEYS } from '@/shared/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createTransaction,
  CreateTransactionRequestBody,
} from '../api/create-transaction.api';

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.TRANSACTIONS],
    mutationFn: (payload: CreateTransactionRequestBody) =>
      createTransaction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TRANSACTIONS],
      });
    },
  });
};
