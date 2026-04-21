'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
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
  const [keys, setKeys] = useState<KeyLoad[]>([]);
  const [issuedAt, setIssuedAt] = useState<string | null>(null);
  const [status, setStatus] = useState<TerminalStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const initialize = async () => {
    setStatus('loading');
    setErrorMessage(null);

    try {
      const response = await loadTerminalKeys(TERMINAL_SERIAL);
      setKeys(response.keys);
      setIssuedAt(response.issuedAt);
      setStatus('initialized');
    } catch (error) {
      setKeys([]);
      setIssuedAt(null);
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Неизвестная ошибка инициализации'
      );
    }
  };

  useEffect(() => {
    void initialize();
  }, []);

  const value = useMemo<TerminalContextValue>(
    () => ({
      terminalSerial: TERMINAL_SERIAL,
      keys,
      issuedAt,
      status,
      errorMessage,
      initialize,
      hasKeys: keys.length > 0,
    }),
    [errorMessage, issuedAt, keys, status]
  );

  return (
    <TerminalContext.Provider value={value}>{children}</TerminalContext.Provider>
  );
}

export function useTerminal() {
  const context = useContext(TerminalContext);

  if (!context) {
    throw new Error('useTerminal должен использоваться внутри TerminalProvider');
  }

  return context;
}
