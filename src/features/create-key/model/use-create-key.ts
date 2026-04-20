import { QUERY_KEYS } from '@/shared/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createKey, CreateKeyRequestBody } from '../api/create-key.api';

export const useCreateKey = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.KEYS],
    mutationFn: (payload: CreateKeyRequestBody) => createKey(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.KEYS],
      });
    },
  });
};
