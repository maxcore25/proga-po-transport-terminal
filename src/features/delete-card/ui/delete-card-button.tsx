'use client';

import { DropdownMenuItem } from '@/shared/ui/dropdown-menu';
import { Spinner } from '@/shared/ui/spinner';
import { useDeleteCard } from '../model/use-delete-card';

interface DeleteCardDropdownItemProps {
  cardId: string;
}

export const DeleteCardDropdownItem = ({
  cardId,
}: DeleteCardDropdownItemProps) => {
  const { mutate, isPending } = useDeleteCard();

  return (
    <DropdownMenuItem
      variant='destructive'
      onClick={() => mutate(cardId)}
      disabled={isPending}
    >
      {isPending ? <Spinner /> : null}
      Удалить
    </DropdownMenuItem>
  );
};
