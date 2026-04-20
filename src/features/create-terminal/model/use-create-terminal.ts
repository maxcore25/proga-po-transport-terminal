import { QUERY_KEYS } from '@/shared/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createTerminal,
  CreateTerminalRequestBody,
} from '../api/create-terminal.api';

export const useCreateTerminal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.TERMINALS],
    mutationFn: (payload: CreateTerminalRequestBody) => createTerminal(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TERMINALS],
      });
    },
  });
};
