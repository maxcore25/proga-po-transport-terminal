'use client';

import { QUERY_KEYS } from '@/shared/config';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext } from 'react';
import { loadTerminalKeys } from '../api/terminal.api';
import { KeyLoad } from './terminal.schemas';

export const TERMINAL_SERIAL = 'TRM-001-BUS';

type TerminalStatus = 'idle' | 'loading' | 'initialized' | 'error';

type TerminalContextValue = {
  terminalSerial: string;
  keys: KeyLoad[];
  issuedAt: string | null;
  status: TerminalStatus;
  errorMessage: string | null;
  initialize: () => Promise<void>;
  hasKeys: boolean;
};

const TerminalContext = createContext<TerminalContextValue | null>(null);

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const query = useQuery({
    queryKey: [QUERY_KEYS.TERMINAL, TERMINAL_SERIAL, QUERY_KEYS.KEYS],
    queryFn: () => loadTerminalKeys(TERMINAL_SERIAL),
  });

  const keys = query.data?.keys ?? [];
  const issuedAt = query.data?.issuedAt ?? null;

  let status: TerminalStatus = 'idle';
  if (query.isPending) status = 'loading';
  if (query.isSuccess) status = 'initialized';
  if (query.isError) status = 'error';

  const errorMessage =
    query.error instanceof Error ? query.error.message : null;
  const initialize = async () => {
    await query.refetch();
  };

  const value: TerminalContextValue = {
    terminalSerial: TERMINAL_SERIAL,
    keys,
    issuedAt,
    status,
    errorMessage,
    initialize,
    hasKeys: keys.length > 0,
  };

  return (
    <TerminalContext.Provider value={value}>
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminal() {
  const context = useContext(TerminalContext);

  if (!context) {
    throw new Error(
      'useTerminal должен использоваться внутри TerminalProvider'
    );
  }

  return context;
}
