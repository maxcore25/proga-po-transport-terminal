import { Terminal } from '@/entities/terminal';
import { UpdateTerminalFormValues } from './update-terminal.schema';

function lastSeenToLocalInput(iso: string | null | undefined) {
  if (!iso) return '';
  return new Date(iso).toISOString().slice(0, 16);
}

export function mapTerminalToFormValues(
  terminal: Terminal
): UpdateTerminalFormValues {
  return {
    name: terminal.name,
    serialNumber: terminal.serialNumber,
    location: terminal.location,
    route: terminal.route ?? '',
    isActive: terminal.isActive,
    lastSeenAt: lastSeenToLocalInput(terminal.lastSeenAt),
  };
}
