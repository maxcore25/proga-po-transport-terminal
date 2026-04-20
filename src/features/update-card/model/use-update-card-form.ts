import { Card } from '@/entities/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { mapCardToFormValues } from './map-card-to-form';
import {
  updateCardFormSchema,
  UpdateCardFormValues,
} from './update-card.schema';
import { useUpdateCard } from './use-update-card';

function toApiPayload(values: UpdateCardFormValues) {
  return {
    cardNumber: values.cardNumber,
    ownerName: values.ownerName,
    keyId: values.keyId,
    balance: values.balance,
    isBlocked: values.isBlocked,
    blockReason: values.blockReason.trim() || undefined,
    expiresAt: values.expiresAt.trim()
      ? new Date(values.expiresAt).toISOString()
      : undefined,
  };
}

export const useUpdateCardForm = (cardId: string, initialCard: Card) => {
  const form = useForm<UpdateCardFormValues>({
    resolver: zodResolver(
      updateCardFormSchema as never
    ) as Resolver<UpdateCardFormValues>,
    defaultValues: mapCardToFormValues(initialCard),
  });

  useEffect(() => {
    form.reset(mapCardToFormValues(initialCard));
  }, [initialCard, form]);

  const { isPending, mutate } = useUpdateCard();

  function onSubmit(values: UpdateCardFormValues) {
    mutate({ id: cardId, payload: toApiPayload(values) });
  }

  function handleCancel() {
    form.reset(mapCardToFormValues(initialCard));
  }

  return {
    form,
    onSubmit,
    handleCancel,
    isPending,
  };
};
