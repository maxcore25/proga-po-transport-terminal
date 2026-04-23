import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { updateUserSchema, UpdateUserValues } from './update-user.schema';
import { useUpdateUser } from './use-update-user';

export const useUpdateUserForm = (
  userId: string,
  initialData?: UpdateUserValues
) => {
  const form = useForm<UpdateUserValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      fullName: initialData?.fullName || '',
      username: initialData?.username || '',
      isAdmin: initialData?.isAdmin || false,
      isActive: initialData?.isActive || false,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        fullName: initialData.fullName || '',
        username: initialData.username || '',
        isAdmin: initialData.isAdmin || false,
        isActive: initialData.isActive || false,
      });
    }
  }, [initialData, form]);

  const { error, isSuccess, isError, isPending, mutate } = useUpdateUser();

  useEffect(() => {
    if (isSuccess) {
      toast.success('User updated successfully');
      form.reset();
    }
  }, [isSuccess, form]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || 'Failed to update user', {
        description: 'Please try again.',
        action: { label: 'Close', onClick: () => null },
      });
      console.error(error);
    }
  }, [isError, error]);

  function onSubmit(values: UpdateUserValues) {
    mutate({ id: userId, payload: values });
  }

  function handleCancel() {
    form.reset();
  }

  return {
    form,
    onSubmit,
    handleCancel,
    ...form,
    isPending,
  };
};
