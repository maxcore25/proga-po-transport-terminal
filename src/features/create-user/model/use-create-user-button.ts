import { useIsMobile } from '@/shared/lib/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createUserSchema, CreateUserValues } from './create-user.schema';
import { useCreateUser } from './use-create-user';

export const useCreateUserButton = () => {
  const form = useForm<CreateUserValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      middleName: '',
      email: '',
      password: '',
      phone: '',
      role: undefined,
      knowledgeLevel: undefined,
      portfolio: '',
      rating: undefined,
      testimonialsCount: undefined,
    },
  });
  const { error, isSuccess, isError, isPending, mutate } = useCreateUser();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isSuccess) {
      form.reset();
    }
  }, [isSuccess, form]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || 'Something went wrong', {
        description: 'Please try again.',
        action: {
          label: 'Close',
          onClick: () => null,
        },
      });

      console.error(error);
    }
  }, [isError, error]);

  function onSubmit(values: CreateUserValues) {
    mutate(values);
  }

  function handleCancel() {
    form.reset();
  }

  return { form, onSubmit, handleCancel, ...form, isPending, isMobile };
};
