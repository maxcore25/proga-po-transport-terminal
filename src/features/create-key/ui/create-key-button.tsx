'use client';

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
import { CreateKeyValues } from '../model/create-key.schema';
import { useCreateKeyButton } from '../model/use-create-key-button';

export const CreateKeyButton = () => {
  const { form, onSubmit, handleCancel, isPending, isMobile } =
    useCreateKeyButton();

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'} onClose={handleCancel}>
      <DrawerTrigger asChild>
        <Button>Создать ключ</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='gap-1'>
          <DrawerTitle>Создать ключ</DrawerTitle>
          <DrawerDescription>
            MIFARE-ключ: тип A (чтение) или B (запись), значение в hex, сектор.
          </DrawerDescription>
        </DrawerHeader>
        <div className='flex flex-col gap-4 overflow-y-auto px-4 text-sm'>
          <form
            onSubmit={form.handleSubmit((values: CreateKeyValues) =>
              onSubmit(values)
            )}
            className='space-y-4'
          >
            <FieldGroup>
              <Controller
                control={form.control}
                name='name'
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Название</FieldLabel>
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
                control={form.control}
                name='keyType'
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Тип ключа</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        className='h-auto! w-full py-3'
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='A'>A (чтение)</SelectItem>
                        <SelectItem value='B'>B (запись)</SelectItem>
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
                name='keyValue'
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Значение (hex, 12–128 символов)
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      className='h-auto py-3 font-mono'
                      placeholder='A1B2C3D4E5F6'
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name='sector'
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Сектор</FieldLabel>
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
                name='description'
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Описание</FieldLabel>
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
                name='isActive'
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Активен</FieldLabel>
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
                        <SelectItem value='true'>Да</SelectItem>
                        <SelectItem value='false'>Нет</SelectItem>
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
              Создать ключ
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
