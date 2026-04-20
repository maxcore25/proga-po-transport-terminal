'use client';

import { DropdownMenuItem } from '@/shared/ui/dropdown-menu';
import { Spinner } from '@/shared/ui/spinner';
import { useDeleteUser } from '../model/use-delete-user';

interface DeleteUserDropdownItemProps {
  userId: string;
}

export const DeleteUserDropdownItem = ({
  userId,
}: DeleteUserDropdownItemProps) => {
  const { mutate, isPending } = useDeleteUser();

  return (
    <DropdownMenuItem
      variant='destructive'
      onClick={() => mutate(userId)}
      disabled={isPending}
    >
      {isPending ? <Spinner /> : null}
      Удалить
    </DropdownMenuItem>
  );
};
