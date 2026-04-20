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
import { useLoginForm } from '../model/use-login-form';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { form, onSubmit, isPending } = useLoginForm();

  return (
    <Card className={cn('max-w-[400px] flex-1', className)} {...props}>
      <CardHeader>
        <CardTitle>Логин</CardTitle>
        <CardDescription>
          Введите username и пароль, чтобы войти в аккаунт.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FieldGroup>
            <Controller
              name='username'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Username</FieldLabel>
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
              name='password'
              control={form.control}
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
            Войти
          </Button>
        </form>
      </CardContent>
      <CardFooter className='justify-center gap-1'>
        Еще нет аккаунта?
        <Button asChild variant='link' className='px-0'>
          <Link href='/register'>Зарегистрироваться</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
