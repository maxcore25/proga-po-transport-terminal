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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { Spinner } from '@/shared/ui/spinner';
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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className='space-y-4'
            >
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
                name='middleName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Отчество</FormLabel>
                    <FormControl>
                      <Input {...field} className='h-auto py-3' />
                    </FormControl>
                    <FormMessage className='h-[20px]' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Электронная почта</FormLabel>
                    <FormControl>
                      <Input type='email' {...field} className='h-auto py-3' />
                    </FormControl>
                    <FormMessage className='h-[20px]' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Телефон</FormLabel>
                    <FormControl>
                      <Input {...field} className='h-auto py-3' />
                    </FormControl>
                    <FormMessage className='h-[20px]' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Роль</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='h-auto! w-full py-3'>
                          <SelectValue placeholder='Выберите роль' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='admin'>Админ</SelectItem>
                        <SelectItem value='tutor'>Преподаватель</SelectItem>
                        <SelectItem value='client'>Клиент</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className='min-h-[20px]' />
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
                name='portfolio'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Портфолио</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className='h-auto py-3'
                        placeholder='Ссылка на портфолио или описание'
                      />
                    </FormControl>
                    <FormMessage className='h-[20px]' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='rating'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Рейтинг</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min='0'
                        max='5'
                        step='0.1'
                        value={field.value ?? ''}
                        onChange={e =>
                          field.onChange(
                            e.target.value === ''
                              ? undefined
                              : Number(e.target.value)
                          )
                        }
                        className='h-auto py-3'
                        placeholder='1-5'
                      />
                    </FormControl>
                    <FormMessage className='h-[20px]' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='testimonialsCount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Количество отзывов</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min='0'
                        value={field.value ?? ''}
                        onChange={e =>
                          field.onChange(
                            e.target.value === ''
                              ? undefined
                              : Number(e.target.value)
                          )
                        }
                        className='h-auto py-3'
                        placeholder='Количество отзывов'
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
                Обновить пользователя
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
