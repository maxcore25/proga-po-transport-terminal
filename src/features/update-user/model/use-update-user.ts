import { QUERY_KEYS } from '@/shared/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '../api/update-user.api';
import { UpdateUserValues } from './update-user.schema';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.USERS],
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUserValues }) =>
      updateUser(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USERS],
      });
    },
  });
};
