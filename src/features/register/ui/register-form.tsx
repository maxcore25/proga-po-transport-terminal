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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { Spinner } from '@/shared/ui/spinner';
import Link from 'next/link';
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-4'}>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input autoFocus {...field} className='h-auto py-3' />
                  </FormControl>
                  <FormMessage className='h-[20px]' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Фамилия</FormLabel>
                  <FormControl>
                    <Input {...field} className='h-auto py-3' />
                  </FormControl>
                  <FormMessage className='h-[20px]' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='knowledgeLevel'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Уровень знаний</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='h-auto! w-full py-3'>
                        <SelectValue placeholder='Выберите уровень' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='beginner'>Начальный</SelectItem>
                      <SelectItem value='intermediate'>Средний</SelectItem>
                      <SelectItem value='advanced'>Продвинутый</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className='h-[20px]' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Почта</FormLabel>
                  <FormControl>
                    <Input type='email' {...field} className='h-auto py-3' />
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
              Зарегистрироваться
            </Button>
          </form>
        </Form>
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
