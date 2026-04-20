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
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { Spinner } from '@/shared/ui/spinner';
import { Controller } from 'react-hook-form';
import { UpdateUserValues } from '../model/update-user.schema';
import { useUpdateUserForm } from '../model/use-update-user-form';

interface UpdateUserDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  initialData: UpdateUserValues;
}

export const UpdateUserDrawer = ({
  open,
  onOpenChange,
  userId,
  initialData,
}: UpdateUserDrawerProps) => {
  const { form, onSubmit, handleCancel, isPending } = useUpdateUserForm(
    userId,
    initialData
  );
  const isMobile = useIsMobile();

  const handleFormSubmit = (values: UpdateUserValues) => {
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
          <DrawerTitle>Редактировать пользователя</DrawerTitle>
          <DrawerDescription>
            Обновите информацию о пользователе ниже.
          </DrawerDescription>
        </DrawerHeader>
        <div className='flex flex-col gap-4 overflow-y-auto px-4 text-sm'>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className='space-y-4'
          >
            <FieldGroup>
              <Controller
                control={form.control as never}
                name={'fullName' as never}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Имя и фамилия</FieldLabel>
                    <Input
                      autoFocus
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      className='h-auto py-3'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control as never}
                name={'username' as never}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      className='h-auto py-3'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control as never}
                name={'isAdmin' as never}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Роль</FieldLabel>
                    <Select
                      value={field.value ? 'true' : 'false'}
                      onValueChange={value => field.onChange(value === 'true')}
                    >
                      <SelectTrigger
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        className='h-auto! w-full py-3'
                      >
                        <SelectValue placeholder='Выберите роль' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='true'>Админ</SelectItem>
                        <SelectItem value='false'>Пользователь</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <Button
              type='submit'
              className='mt-6! h-auto w-full gap-2 py-3'
              disabled={isPending}
            >
              {isPending ? <Spinner /> : null}
              Обновить пользователя
            </Button>
          </form>
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
