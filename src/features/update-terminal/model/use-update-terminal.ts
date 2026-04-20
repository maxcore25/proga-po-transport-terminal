import { QUERY_KEYS } from '@/shared/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  updateTerminal,
  UpdateTerminalRequestBody,
} from '../api/update-terminal.api';

export const useUpdateTerminal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.TERMINALS],
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateTerminalRequestBody;
    }) => updateTerminal(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TERMINALS],
      });
      toast.success('Терминал обновлён');
    },
    onError: error => {
      toast.error(error?.message || 'Не удалось обновить терминал', {
        description: 'Попробуйте ещё раз.',
        action: { label: 'Закрыть', onClick: () => null },
      });
      console.error(error);
    },
  });
};
