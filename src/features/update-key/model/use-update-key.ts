import { QUERY_KEYS } from '@/shared/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateKey, UpdateKeyRequestBody } from '../api/update-key.api';

export const useUpdateKey = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.KEYS],
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateKeyRequestBody;
    }) => updateKey(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.KEYS],
      });
      toast.success('Ключ обновлён');
    },
    onError: error => {
      toast.error(error?.message || 'Не удалось обновить ключ', {
        description: 'Попробуйте ещё раз.',
        action: { label: 'Закрыть', onClick: () => null },
      });
      console.error(error);
    },
  });
};
