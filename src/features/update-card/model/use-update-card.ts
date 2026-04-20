import { QUERY_KEYS } from '@/shared/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateCard, UpdateCardRequestBody } from '../api/update-card.api';

export const useUpdateCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.CARDS],
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateCardRequestBody;
    }) => updateCard(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CARDS],
      });
      toast.success('Карта обновлена');
    },
    onError: error => {
      toast.error(error?.message || 'Не удалось обновить карту', {
        description: 'Попробуйте ещё раз.',
        action: { label: 'Закрыть', onClick: () => null },
      });
      console.error(error);
    },
  });
};
