/* eslint-disable react-hooks/incompatible-library */
'use client';

import { Key, useGetKeys } from '@/entities/key';
import { CreateKeyButton } from '@/features/create-key';
import { DeleteKeyDropdownItem } from '@/features/delete-key';
import { UpdateKeyDrawer } from '@/features/update-key';
import { useIsMobile } from '@/shared/lib/hooks';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/drawer';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Label } from '@/shared/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { Skeleton } from '@/shared/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconDotsVertical,
  IconLayoutColumns,
} from '@tabler/icons-react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import * as React from 'react';

function shortenHex(value: string, head = 10) {
  if (value.length <= head + 3) return value;
  return `${value.slice(0, head)}…`;
}

function ActionsCell({ row }: { row: Row<Key> }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <div className='flex justify-end'>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='data-[state=open]:bg-muted text-muted-foreground flex size-8'
              size='icon'
            >
              <IconDotsVertical />
              <span className='sr-only'>Открыть меню</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-32'>
            <DropdownMenuItem onSelect={() => setIsOpen(true)}>
              Редактировать
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DeleteKeyDropdownItem keyId={row.original.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <UpdateKeyDrawer
        open={isOpen}
        onOpenChange={setIsOpen}
        keyId={row.original.id}
        initialKey={row.original}
      />
    </>
  );
}

const columns: ColumnDef<Key>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className='flex items-center justify-center'>
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Выбрать все'
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className='flex items-center justify-center'>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label='Выбрать строку'
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Название',
    cell: ({ row }) => <TableCellViewer item={row.original} />,
    enableHiding: false,
  },
  {
    accessorKey: 'keyType',
    header: 'Тип',
    cell: ({ row }) =>
      row.original.keyType === 'A' ? 'A (чтение)' : 'B (запись)',
  },
  {
    accessorKey: 'keyValue',
    header: 'Значение',
    cell: ({ row }) => (
      <code
        className='text-xs'
        title={row.original.keyValue}
      >
        {shortenHex(row.original.keyValue)}
      </code>
    ),
  },
  {
    accessorKey: 'sector',
    header: 'Сектор',
    cell: ({ row }) => row.original.sector,
  },
  {
    accessorKey: 'isActive',
    header: 'Активен',
    cell: ({ row }) => (row.original.isActive ? 'Да' : 'Нет'),
  },
  {
    accessorKey: 'description',
    header: 'Описание',
    cell: ({ row }) => {
      const d = row.original.description;
      if (!d) return <span className='text-muted-foreground'>—</span>;
      const short = d.length > 40 ? `${d.slice(0, 40)}…` : d;
      return (
        <span className='max-w-[200px] truncate' title={d}>
          {short}
        </span>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Создано',
    cell: ({ row }) => (
      <span>{new Date(row.original.createdAt).toLocaleString()}</span>
    ),
  },
  {
    accessorKey: 'updatedAt',
    header: 'Обновлено',
    cell: ({ row }) => (
      <span>{new Date(row.original.updatedAt).toLocaleString()}</span>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];

function BasicTableRow({ row }: { row: Row<Key> }) {
  return (
    <TableRow data-state={row.getIsSelected() && 'selected'}>
      {row.getVisibleCells().map(cell => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function KeysTable() {
  const { data: keys, isLoading } = useGetKeys();
  const [data, setData] = React.useState<Key[]>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  React.useEffect(() => {
    if (keys) {
      setData(keys);
    }
  }, [keys]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: row => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  if (isLoading) {
    return (
      <div className='flex flex-col gap-6 px-4 lg:px-6'>
        <Skeleton className='h-[500px] rounded-xl' />
        <div className='flex justify-between'>
          <Skeleton className='h-10 w-[150px]' />
          <Skeleton className='h-10 w-[300px]' />
        </div>
      </div>
    );
  }

  if (!keys || keys.length === 0) {
    return (
      <div className='w-full flex-col justify-start gap-6'>
        <div className='flex h-32 flex-col items-center justify-center gap-2'>
          <div className='text-muted-foreground'>Ключи не найдены.</div>
          <CreateKeyButton />
        </div>
      </div>
    );
  }

  return (
    <div className='flex w-full flex-col justify-start gap-6'>
      <div className='flex items-center justify-between px-4 lg:px-6'>
        <h2 className='text-2xl leading-none font-semibold'>Ключи</h2>
        <div className='flex items-center gap-2'>
          <CreateKeyButton />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm'>
                <IconLayoutColumns />
                <span className='hidden lg:inline'>Настроить столбцы</span>
                <span className='lg:hidden'>Столбцы</span>
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56'>
              {table
                .getAllColumns()
                .filter(
                  column =>
                    typeof column.accessorFn !== 'undefined' &&
                    column.getCanHide()
                )
                .map(column => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className='capitalize'
                      checked={column.getIsVisible()}
                      onCheckedChange={value =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className='relative flex flex-col gap-4 overflow-auto px-4 lg:px-6'>
        <div className='overflow-hidden rounded-lg border'>
          <Table>
            <TableHeader className='bg-muted sticky top-0 z-10'>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className='**:data-[slot=table-cell]:first:w-8'>
              {table.getRowModel().rows?.length ? (
                <>
                  {table.getRowModel().rows.map(row => (
                    <BasicTableRow key={row.id} row={row} />
                  ))}
                </>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    Нет результатов.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className='flex items-center justify-between px-4'>
          <div className='text-muted-foreground hidden flex-1 text-sm lg:flex'>
            {table.getFilteredSelectedRowModel().rows.length} из{' '}
            {table.getFilteredRowModel().rows.length} выбранных строк(и)
          </div>
          <div className='flex w-full items-center gap-8 lg:w-fit'>
            <div className='hidden items-center gap-2 lg:flex'>
              <Label
                htmlFor='rows-per-page-keys'
                className='text-sm font-medium'
              >
                Строк на странице
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={value => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger
                  size='sm'
                  className='w-20'
                  id='rows-per-page-keys'
                >
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side='top'>
                  {[10, 20, 30, 40, 50].map(pageSize => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='flex w-fit items-center justify-center text-sm font-medium'>
              Страница {table.getState().pagination.pageIndex + 1} из{' '}
              {table.getPageCount()}
            </div>
            <div className='ml-auto flex items-center gap-2 lg:ml-0'>
              <Button
                variant='outline'
                className='hidden h-8 w-8 p-0 lg:flex'
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className='sr-only'>Перейти на первую страницу</span>
                <IconChevronsLeft />
              </Button>
              <Button
                variant='outline'
                className='size-8'
                size='icon'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className='sr-only'>Перейти на предыдущую страницу</span>
                <IconChevronLeft />
              </Button>
              <Button
                variant='outline'
                className='size-8'
                size='icon'
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className='sr-only'>Перейти на следующую страницу</span>
                <IconChevronRight />
              </Button>
              <Button
                variant='outline'
                className='hidden size-8 lg:flex'
                size='icon'
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className='sr-only'>Перейти на последнюю страницу</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableCellViewer({ item }: { item: Key }) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger asChild>
        <Button variant='link' className='text-foreground w-fit px-0 text-left'>
          {item.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='gap-1'>
          <DrawerTitle>{item.name}</DrawerTitle>
        </DrawerHeader>
        <div className='flex flex-col gap-4 overflow-y-auto px-4 text-sm'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label>ID</Label>
              <div className='mt-1'>{item.id}</div>
            </div>
            <div>
              <Label>Тип</Label>
              <div className='mt-1'>
                {item.keyType === 'A' ? 'A (чтение)' : 'B (запись)'}
              </div>
            </div>
            <div className='col-span-2'>
              <Label>Значение (hex)</Label>
              <div className='mt-1 font-mono break-all'>{item.keyValue}</div>
            </div>
            <div>
              <Label>Сектор</Label>
              <div className='mt-1'>{item.sector}</div>
            </div>
            <div>
              <Label>Активен</Label>
              <div className='mt-1'>{item.isActive ? 'Да' : 'Нет'}</div>
            </div>
            <div className='col-span-2'>
              <Label>Описание</Label>
              <div className='mt-1'>{item.description || '—'}</div>
            </div>
            <div>
              <Label>Создано</Label>
              <div className='mt-1'>
                {new Date(item.createdAt).toLocaleString()}
              </div>
            </div>
            <div>
              <Label>Обновлено</Label>
              <div className='mt-1'>
                {new Date(item.updatedAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant='outline'>Закрыть</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
