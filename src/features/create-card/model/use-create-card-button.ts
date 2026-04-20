import { useIsMobile } from '@/shared/lib/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createCardSchema, CreateCardValues } from './create-card.schema';
import { useCreateCard } from './use-create-card';

function toApiPayload(values: CreateCardValues) {
  return {
    cardNumber: values.cardNumber,
    ownerName: values.ownerName,
    keyId: values.keyId,
    balance: values.balance,
    isBlocked: values.isBlocked,
    blockReason: values.blockReason?.trim() || undefined,
    expiresAt: values.expiresAt?.trim()
      ? new Date(values.expiresAt).toISOString()
      : undefined,
  };
}

export const useCreateCardButton = () => {
  const form = useForm<CreateCardValues>({
    resolver: zodResolver(createCardSchema as never) as Resolver<CreateCardValues>,
    defaultValues: {
      cardNumber: '',
      ownerName: '',
      keyId: '',
      balance: 0,
      isBlocked: false,
      blockReason: '',
      expiresAt: '',
    },
  });
  const { error, isSuccess, isError, isPending, mutate } = useCreateCard();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isSuccess) {
      form.reset({
        cardNumber: '',
        ownerName: '',
        keyId: '',
        balance: 0,
        isBlocked: false,
        blockReason: '',
        expiresAt: '',
      });
    }
  }, [isSuccess, form]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || 'Не удалось создать карту', {
        description: 'Попробуйте ещё раз.',
        action: {
          label: 'Закрыть',
          onClick: () => null,
        },
      });

      console.error(error);
    }
  }, [isError, error]);

  function onSubmit(values: CreateCardValues) {
    mutate(toApiPayload(values));
  }

  function handleCancel() {
    form.reset();
  }

  return { form, onSubmit, handleCancel, ...form, isPending, isMobile };
};
