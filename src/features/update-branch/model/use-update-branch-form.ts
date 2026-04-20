import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { updateBranchSchema, UpdateBranchValues } from './update-branch.schema';
import { useUpdateBranch } from './use-update-branch';

export const useUpdateBranchForm = (
  branchId: string,
  initialData?: UpdateBranchValues
) => {
  const form = useForm<UpdateBranchValues>({
    resolver: zodResolver(updateBranchSchema),
    defaultValues: {
      address: initialData?.address || '',
      rooms: initialData?.rooms || 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        address: initialData.address || '',
        rooms: initialData.rooms || 0,
      });
    }
  }, [initialData, form]);

  const { error, isSuccess, isError, isPending, mutate } = useUpdateBranch();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Branch updated successfully');
      form.reset();
    }
  }, [isSuccess, form]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || 'Failed to update branch', {
        description: 'Please try again.',
        action: { label: 'Close', onClick: () => null },
      });
      console.error(error);
    }
  }, [isError, error]);

  function onSubmit(values: UpdateBranchValues) {
    mutate({ id: branchId, payload: values });
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
