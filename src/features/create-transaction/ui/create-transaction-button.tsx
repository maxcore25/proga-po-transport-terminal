'use client';

import { useGetCards } from '@/entities/card';
import { useGetTerminals } from '@/entities/terminal';
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
import { CreateTransactionValues } from '../model/create-transaction.schema';
import { useCreateTransactionButton } from '../model/use-create-transaction-button';

export const CreateTransactionButton = () => {
  const { form, onSubmit, handleCancel, isPending, isMobile } =
    useCreateTransactionButton();
  const { data: cards, isLoading: cardsLoading } = useGetCards();
  const { data: terminals, isLoading: terminalsLoading } = useGetTerminals();

  const listsReady = !cardsLoading && !terminalsLoading;
  const canSubmit =
    listsReady && (cards?.length ?? 0) > 0 && (terminals?.length ?? 0) > 0;

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'} onClose={handleCancel}>
      <DrawerTrigger asChild>
        <Button variant='outline'>Создать транзакцию</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='gap-1'>
          <DrawerTitle>Создать транзакцию</DrawerTitle>
          <DrawerDescription>
            Суммы и балансы в копейках. Выберите карту и терминал.
          </DrawerDescription>
        </DrawerHeader>
        <div className='flex flex-col gap-4 overflow-y-auto px-4 text-sm'>
          <form
            onSubmit={form.handleSubmit((values: CreateTransactionValues) =>
              onSubmit(values)
            )}
            className='space-y-4'
          >
            <FieldGroup>
              <Controller
                control={form.control}
                name='cardId'
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Карта</FieldLabel>
                    <Select
                      value={field.value || undefined}
                      onValueChange={field.onChange}
                      disabled={cardsLoading || !cards?.length}
                    >
                      <SelectTrigger
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        className='h-auto! w-full py-3'
                      >
                        <SelectValue
                          placeholder={
                            cardsLoading
                              ? 'Загрузка…'
                              : cards?.length
                                ? 'Выберите карту'
                                : 'Нет карт'
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {cards?.map(c => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.cardNumber} — {c.ownerName}
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
                name='terminalId'
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Терминал</FieldLabel>
                    <Select
                      value={field.value || undefined}
                      onValueChange={field.onChange}
                      disabled={terminalsLoading || !terminals?.length}
                    >
                      <SelectTrigger
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        className='h-auto! w-full py-3'
                      >
                        <SelectValue
                          placeholder={
                            terminalsLoading
                              ? 'Загрузка…'
                              : terminals?.length
                                ? 'Выберите терминал'
                                : 'Нет терминалов'
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {terminals?.map(t => (
                          <SelectItem key={t.id} value={t.id}>
                            {t.name} ({t.serialNumber})
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
                name='status'
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Статус</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        className='h-auto! w-full py-3'
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='approved'>Одобрено</SelectItem>
                        <SelectItem value='declined'>Отклонено</SelectItem>
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
                name='amount'
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Сумма (коп.)</FieldLabel>
                    <Input
                      type='number'
                      min={1}
                      id={field.name}
                      name={field.name}
                      value={Number.isFinite(field.value) ? field.value : 1}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      aria-invalid={fieldState.invalid}
                      className='h-auto py-3'
                      onChange={e => {
                        const raw = e.target.value;
                        field.onChange(
                          raw === '' ? 1 : Number.parseInt(raw, 10) || 1
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
                name='balanceBefore'
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Баланс до (коп.)
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
                name='balanceAfter'
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Баланс после (коп.)
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
                name='declineReason'
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Причина отказа (при declined)
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
            </FieldGroup>
            <Button
              type='submit'
              className='mt-6! h-auto w-full gap-2 py-3'
              disabled={isPending || !canSubmit}
            >
              {isPending ? <Spinner /> : null}
              Создать транзакцию
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
