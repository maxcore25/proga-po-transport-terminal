'use client';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { PasswordInput } from '@/shared/ui/password-input';
import { Spinner } from '@/shared/ui/spinner';
import Link from 'next/link';
import { Controller } from 'react-hook-form';
import { useRegisterForm } from '../model/use-register-form';

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { form, onSubmit, isPending } = useRegisterForm();

  return (
    <Card className={cn('max-w-[400px] flex-1', className)} {...props}>
      <CardHeader>
        <CardTitle>Регистрация</CardTitle>
        <CardDescription>
          Заполните форму, чтобы создать аккаунт.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FieldGroup>
            <Controller
              control={form.control}
              name='firstName'
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Имя</FieldLabel>
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
              name='lastName'
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Фамилия</FieldLabel>
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
              name='email'
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Почта</FieldLabel>
                  <Input
                    type='email'
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
              name='password'
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Пароль</FieldLabel>
                  <PasswordInput
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
            disabled={isPending}
          >
            {isPending ? <Spinner /> : null}
            Зарегистрироваться
          </Button>
        </form>
      </CardContent>
      <CardFooter className='justify-center gap-1'>
        Уже есть аккаунт?
        <Button asChild variant='link' className='px-0'>
          <Link href='/login'>Войти</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
