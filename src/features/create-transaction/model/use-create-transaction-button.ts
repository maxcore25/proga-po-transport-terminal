import { useIsMobile } from '@/shared/lib/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  createTransactionSchema,
  CreateTransactionValues,
} from './create-transaction.schema';
import { useCreateTransaction } from './use-create-transaction';

function toApiPayload(values: CreateTransactionValues) {
  return {
    amount: values.amount,
    balanceBefore: values.balanceBefore,
    balanceAfter: values.balanceAfter,
    cardId: values.cardId,
    terminalId: values.terminalId,
    status: values.status,
    declineReason: values.declineReason?.trim() || undefined,
  };
}

export const useCreateTransactionButton = () => {
  const form = useForm<CreateTransactionValues>({
    resolver: zodResolver(
      createTransactionSchema as never
    ) as Resolver<CreateTransactionValues>,
    defaultValues: {
      amount: 1,
      balanceBefore: 0,
      balanceAfter: 0,
      cardId: '',
      terminalId: '',
      status: 'approved',
      declineReason: '',
    },
  });
  const { error, isSuccess, isError, isPending, mutate } = useCreateTransaction();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isSuccess) {
      form.reset({
        amount: 1,
        balanceBefore: 0,
        balanceAfter: 0,
        cardId: '',
        terminalId: '',
        status: 'approved',
        declineReason: '',
      });
    }
  }, [isSuccess, form]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || 'Не удалось создать транзакцию', {
        description: 'Попробуйте ещё раз.',
        action: {
          label: 'Закрыть',
          onClick: () => null,
        },
      });

      console.error(error);
    }
  }, [isError, error]);

  function onSubmit(values: CreateTransactionValues) {
    mutate(toApiPayload(values));
  }

  function handleCancel() {
    form.reset();
  }

  return { form, onSubmit, handleCancel, ...form, isPending, isMobile };
};
