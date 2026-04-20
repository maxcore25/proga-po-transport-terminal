'use client';

import { DropdownMenuItem } from '@/shared/ui/dropdown-menu';
import { Spinner } from '@/shared/ui/spinner';
import { useDeleteKey } from '../model/use-delete-key';

interface DeleteKeyDropdownItemProps {
  keyId: string;
}

export const DeleteKeyDropdownItem = ({
  keyId,
}: DeleteKeyDropdownItemProps) => {
  const { mutate, isPending } = useDeleteKey();

  return (
    <DropdownMenuItem
      variant='destructive'
      onClick={() => mutate(keyId)}
      disabled={isPending}
    >
      {isPending ? <Spinner /> : null}
      Удалить
    </DropdownMenuItem>
  );
};
