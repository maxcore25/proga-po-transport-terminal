import { useIsMobile } from '@/shared/lib/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createKeySchema, CreateKeyValues } from './create-key.schema';
import { useCreateKey } from './use-create-key';

function toApiPayload(values: CreateKeyValues) {
  return {
    name: values.name,
    keyType: values.keyType,
    keyValue: values.keyValue,
    description: values.description?.trim() || undefined,
    isActive: values.isActive,
    sector: values.sector,
  };
}

export const useCreateKeyButton = () => {
  const form = useForm<CreateKeyValues>({
    resolver: zodResolver(createKeySchema as never) as Resolver<CreateKeyValues>,
    defaultValues: {
      name: '',
      keyType: 'A',
      keyValue: '',
      description: '',
      isActive: true,
      sector: 0,
    },
  });
  const { error, isSuccess, isError, isPending, mutate } = useCreateKey();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isSuccess) {
      form.reset({
        name: '',
        keyType: 'A',
        keyValue: '',
        description: '',
        isActive: true,
        sector: 0,
      });
    }
  }, [isSuccess, form]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || 'Не удалось создать ключ', {
        description: 'Попробуйте ещё раз.',
        action: {
          label: 'Закрыть',
          onClick: () => null,
        },
      });

      console.error(error);
    }
  }, [isError, error]);

  function onSubmit(values: CreateKeyValues) {
    mutate(toApiPayload(values));
  }

  function handleCancel() {
    form.reset();
  }

  return { form, onSubmit, handleCancel, ...form, isPending, isMobile };
};
