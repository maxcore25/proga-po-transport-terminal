import { useIsMobile } from '@/shared/lib/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  createTerminalSchema,
  CreateTerminalValues,
} from './create-terminal.schema';
import { useCreateTerminal } from './use-create-terminal';

function toApiPayload(values: CreateTerminalValues) {
  return {
    name: values.name,
    serialNumber: values.serialNumber,
    location: values.location,
    route: values.route?.trim() || undefined,
    isActive: values.isActive,
    lastSeenAt: values.lastSeenAt?.trim()
      ? new Date(values.lastSeenAt).toISOString()
      : undefined,
  };
}

export const useCreateTerminalButton = () => {
  const form = useForm<CreateTerminalValues>({
    resolver: zodResolver(
      createTerminalSchema as never
    ) as Resolver<CreateTerminalValues>,
    defaultValues: {
      name: '',
      serialNumber: '',
      location: '',
      route: '',
      isActive: true,
      lastSeenAt: '',
    },
  });
  const { error, isSuccess, isError, isPending, mutate } = useCreateTerminal();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isSuccess) {
      form.reset({
        name: '',
        serialNumber: '',
        location: '',
        route: '',
        isActive: true,
        lastSeenAt: '',
      });
    }
  }, [isSuccess, form]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || 'Не удалось создать терминал', {
        description: 'Попробуйте ещё раз.',
        action: {
          label: 'Закрыть',
          onClick: () => null,
        },
      });

      console.error(error);
    }
  }, [isError, error]);

  function onSubmit(values: CreateTerminalValues) {
    mutate(toApiPayload(values));
  }

  function handleCancel() {
    form.reset();
  }

  return { form, onSubmit, handleCancel, ...form, isPending, isMobile };
};
