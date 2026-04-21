'use client';

import { useGetKeys } from '@/entities/key';
import { Button } from '@/shared/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
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
import { useCreateCardButton } from '../model/use-create-card-button';

export const CreateCardButton = () => {
  const { form, onSubmit, handleCancel, isPending, isMobile } =
    useCreateCardButton();
  const { data: keys, isLoading: keysLoading } = useGetKeys();

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'} onClose={handleCancel}>
      <DrawerTrigger asChild>
        <Button>Создать карту</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='gap-1'>
          <DrawerTitle>Создать карту</DrawerTitle>
          <DrawerDescription>
            Укажите номер карты (UID), владельца и ключ шифрования.
          </DrawerDescription>
        </DrawerHeader>
        <div className='flex flex-col gap-4 overflow-y-auto px-4 text-sm'>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FieldGroup>
              <Controller
                control={form.control}
                name='cardNumber'
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Номер карты (UID)
                    </FieldLabel>
                    <Input
                      autoFocus
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      className='h-auto py-3'
                      placeholder='A1B2C3D4'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name='ownerName'
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Владелец</FieldLabel>
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
                control={form.control}
                name='keyId'
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Ключ</FieldLabel>
                    <Select
                      value={field.value || undefined}
                      onValueChange={field.onChange}
                      disabled={keysLoading || !keys?.length}
                    >
                      <SelectTrigger
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        className='h-auto! w-full py-3'
                      >
                        <SelectValue
                          placeholder={
                            keysLoading
                              ? 'Загрузка…'
                              : keys?.length
                                ? 'Выберите ключ'
                                : 'Нет ключей'
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {keys?.map(k => (
                          <SelectItem key={k.id} value={k.id}>
                            {k.name} ({k.keyType})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name='balance'
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Баланс (копейки)
                    </FieldLabel>
                    <Input
                      type='number'
                      min={0}
                      id={field.name}
                      name={field.name}
                      value={Number.isFinite(field.value) ? field.value : 0}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      aria-invalid={fieldState.invalid}
                      className='h-auto py-3'
                      onChange={e => {
                        const raw = e.target.value;
                        field.onChange(
                          raw === '' ? 0 : Number.parseInt(raw, 10) || 0
                        );
                      }}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name='isBlocked'
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Заблокирована</FieldLabel>
                    <Select
                      value={field.value ? 'true' : 'false'}
                      onValueChange={value => field.onChange(value === 'true')}
                    >
                      <SelectTrigger
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        className='h-auto! w-full py-3'
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='false'>Нет</SelectItem>
                        <SelectItem value='true'>Да</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name='blockReason'
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Причина блокировки
                    </FieldLabel>
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
                control={form.control}
                name='expiresAt'
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Истекает</FieldLabel>
                    <Input
                      {...field}
                      type='datetime-local'
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
            </FieldGroup>
            <Button
              type='submit'
              className='mt-6! h-auto w-full gap-2 py-3'
              disabled={isPending || keysLoading || !keys?.length}
            >
              {isPending ? <Spinner /> : null}
              Создать карту
            </Button>
          </form>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant='outline'>Отмена</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
