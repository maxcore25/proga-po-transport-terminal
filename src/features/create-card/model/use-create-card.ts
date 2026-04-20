import { QUERY_KEYS } from '@/shared/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCard, CreateCardRequestBody } from '../api/create-card.api';

export const useCreateCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.CARDS],
    mutationFn: (payload: CreateCardRequestBody) => createCard(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CARDS],
      });
    },
  });
};
