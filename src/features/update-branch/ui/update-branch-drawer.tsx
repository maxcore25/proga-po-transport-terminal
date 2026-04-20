'use client';

import { useIsMobile } from '@/shared/lib/hooks';
import { Button } from '@/shared/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/shared/ui/drawer';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Spinner } from '@/shared/ui/spinner';
import { UpdateBranchValues } from '../model/update-branch.schema';
import { useUpdateBranchForm } from '../model/use-update-branch-form';

interface UpdateBranchDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  branchId: string;
  initialData: UpdateBranchValues;
}

export const UpdateBranchDrawer = ({
  open,
  onOpenChange,
  branchId,
  initialData,
}: UpdateBranchDrawerProps) => {
  const { form, onSubmit, handleCancel, isPending } = useUpdateBranchForm(
    branchId,
    initialData
  );
  const isMobile = useIsMobile();

  const handleFormSubmit = (values: UpdateBranchValues) => {
    onSubmit(values);
  };

  const handleCancelClick = () => {
    handleCancel();
  };

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      direction={isMobile ? 'bottom' : 'right'}
    >
      <DrawerContent>
        <DrawerHeader className='gap-1'>
          <DrawerTitle>Редактировать филиал</DrawerTitle>
          <DrawerDescription>
            Обновите информацию о филиале ниже.
          </DrawerDescription>
        </DrawerHeader>
        <div className='flex flex-col gap-4 overflow-y-auto px-4 text-sm'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className='space-y-4'
            >
              <FormField
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Адрес</FormLabel>
                    <FormControl>
                      <Input autoFocus {...field} className='h-auto py-3' />
                    </FormControl>
                    <FormMessage className='h-[20px]' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='rooms'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Количество комнат</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                        className='h-auto py-3'
                      />
                    </FormControl>
                    <FormMessage className='h-[20px]' />
                  </FormItem>
                )}
              />

              <Button
                type='submit'
                className='mt-6! h-auto w-full gap-2 py-3'
                disabled={isPending}
              >
                {isPending ? <Spinner /> : null}
                Обновить филиал
              </Button>
            </form>
          </Form>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant='outline' onClick={handleCancelClick}>
              Отмена
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
