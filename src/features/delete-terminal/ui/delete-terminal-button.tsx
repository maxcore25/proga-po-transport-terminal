'use client';

import { DropdownMenuItem } from '@/shared/ui/dropdown-menu';
import { Spinner } from '@/shared/ui/spinner';
import { useDeleteTerminal } from '../model/use-delete-terminal';

interface DeleteTerminalDropdownItemProps {
  terminalId: string;
}

export const DeleteTerminalDropdownItem = ({
  terminalId,
}: DeleteTerminalDropdownItemProps) => {
  const { mutate, isPending } = useDeleteTerminal();

  return (
    <DropdownMenuItem
      variant='destructive'
      onClick={() => mutate(terminalId)}
      disabled={isPending}
    >
      {isPending ? <Spinner /> : null}
      Удалить
    </DropdownMenuItem>
  );
};
