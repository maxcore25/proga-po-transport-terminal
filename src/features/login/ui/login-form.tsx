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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { PasswordInput } from '@/shared/ui/password-input';
import { Spinner } from '@/shared/ui/spinner';
import { useLoginForm } from '../model/use-login-form';
import Link from 'next/link';

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
          Введите почту и пароль, чтобы войти в аккаунт.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Почта</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      autoFocus
                      {...field}
                      className='h-auto py-3'
                    />
                  </FormControl>
                  <FormMessage className='h-[20px]' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} className='h-auto py-3' />
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
              Войти
            </Button>
          </form>
        </Form>
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
