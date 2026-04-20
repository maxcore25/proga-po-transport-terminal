'use client';

import { DropdownMenuItem } from '@/shared/ui/dropdown-menu';
import { Spinner } from '@/shared/ui/spinner';
import { useDeleteTransaction } from '../model/use-delete-transaction';

interface DeleteTransactionDropdownItemProps {
  transactionId: string;
}

export const DeleteTransactionDropdownItem = ({
  transactionId,
}: DeleteTransactionDropdownItemProps) => {
  const { mutate, isPending } = useDeleteTransaction();

  return (
    <DropdownMenuItem
      variant='destructive'
      onClick={() => mutate(transactionId)}
      disabled={isPending}
    >
      {isPending ? <Spinner /> : null}
      Удалить
    </DropdownMenuItem>
  );
};
