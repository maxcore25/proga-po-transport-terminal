import { Key } from '@/entities/key';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { mapKeyToFormValues } from './map-key-to-form';
import {
  updateKeyFormSchema,
  UpdateKeyFormValues,
} from './update-key.schema';
import { useUpdateKey } from './use-update-key';

function toApiPayload(values: UpdateKeyFormValues) {
  return {
    name: values.name,
    keyType: values.keyType,
    keyValue: values.keyValue,
    sector: values.sector,
    description: values.description.trim() || undefined,
    isActive: values.isActive,
  };
}

export const useUpdateKeyForm = (keyId: string, initialKey: Key) => {
  const form = useForm<UpdateKeyFormValues>({
    resolver: zodResolver(
      updateKeyFormSchema as never
    ) as Resolver<UpdateKeyFormValues>,
    defaultValues: mapKeyToFormValues(initialKey),
  });

  useEffect(() => {
    form.reset(mapKeyToFormValues(initialKey));
  }, [initialKey, form]);

  const { isPending, mutate } = useUpdateKey();

  function onSubmit(values: UpdateKeyFormValues) {
    mutate({ id: keyId, payload: toApiPayload(values) });
  }

  function handleCancel() {
    form.reset(mapKeyToFormValues(initialKey));
  }

  return {
    form,
    onSubmit,
    handleCancel,
    isPending,
  };
};
