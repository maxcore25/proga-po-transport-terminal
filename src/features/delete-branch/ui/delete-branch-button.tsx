'use client';

import { DropdownMenuItem } from '@/shared/ui/dropdown-menu';
import { Spinner } from '@/shared/ui/spinner';
import { useDeleteBranch } from '../model/use-delete-topping';

interface DeleteBranchDropdownItemProps {
  branchId: string;
}

export const DeleteBranchDropdownItem = ({
  branchId,
}: DeleteBranchDropdownItemProps) => {
  const { mutate, isPending } = useDeleteBranch();

  return (
    <DropdownMenuItem
      variant='destructive'
      onClick={() => mutate(branchId)}
      disabled={isPending}
    >
      {isPending ? <Spinner /> : null}
      Удалить
    </DropdownMenuItem>
  );
};
