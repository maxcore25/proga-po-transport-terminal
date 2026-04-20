import { useIsMobile } from '@/shared/lib/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createBranchSchema, CreateBranchValues } from './create-branch.schema';
import { useCreateBranch } from './use-create-branch';

export const useCreateBranchButton = () => {
  const form = useForm<CreateBranchValues>({
    resolver: zodResolver(createBranchSchema),
    defaultValues: {
      address: '',
      rooms: 0,
    },
  });
  const { error, isSuccess, isError, isPending, mutate } = useCreateBranch();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isSuccess) {
      form.reset();
    }
  }, [isSuccess, form]);

  useEffect(() => {
    if (isError) {
      toast.error(error.message || 'Something went wrong', {
        description: 'Please try again.',
        action: {
          label: 'Close',
          onClick: () => null,
        },
      });

      console.error(error);
    }
  }, [isError, error]);

  function onSubmit(values: CreateBranchValues) {
    mutate(values);
  }

  function handleCancel() {
    form.reset();
  }

  return { form, onSubmit, handleCancel, ...form, isPending, isMobile };
};
