import { Terminal } from '@/entities/terminal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { mapTerminalToFormValues } from './map-terminal-to-form';
import {
  updateTerminalFormSchema,
  UpdateTerminalFormValues,
} from './update-terminal.schema';
import { useUpdateTerminal } from './use-update-terminal';

function toApiPayload(values: UpdateTerminalFormValues) {
  return {
    name: values.name,
    serialNumber: values.serialNumber,
    location: values.location,
    route: values.route.trim() || undefined,
    isActive: values.isActive,
    lastSeenAt: values.lastSeenAt.trim()
      ? new Date(values.lastSeenAt).toISOString()
      : undefined,
  };
}

export const useUpdateTerminalForm = (
  terminalId: string,
  initialTerminal: Terminal
) => {
  const form = useForm<UpdateTerminalFormValues>({
    resolver: zodResolver(
      updateTerminalFormSchema as never
    ) as Resolver<UpdateTerminalFormValues>,
    defaultValues: mapTerminalToFormValues(initialTerminal),
  });

  useEffect(() => {
    form.reset(mapTerminalToFormValues(initialTerminal));
  }, [initialTerminal, form]);

  const { isPending, mutate } = useUpdateTerminal();

  function onSubmit(values: UpdateTerminalFormValues) {
    mutate({ id: terminalId, payload: toApiPayload(values) });
  }

  function handleCancel() {
    form.reset(mapTerminalToFormValues(initialTerminal));
  }

  return {
    form,
    onSubmit,
    handleCancel,
    isPending,
  };
};
