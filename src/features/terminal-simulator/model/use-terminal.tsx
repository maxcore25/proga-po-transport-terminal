'use client';

import { useEffect } from 'react';
import { useTerminalStore } from './terminal.store';

export function useTerminal() {
  const terminalSerial = useTerminalStore(state => state.terminalSerial);
  const keys = useTerminalStore(state => state.keys);
  const issuedAt = useTerminalStore(state => state.issuedAt);
  const status = useTerminalStore(state => state.status);
  const errorMessage = useTerminalStore(state => state.errorMessage);
  const initialize = useTerminalStore(state => state.initialize);

  useEffect(() => {
    if (status === 'idle') {
      void initialize();
    }
  }, [initialize, status]);

  return {
    terminalSerial,
    keys,
    issuedAt,
    status,
    errorMessage,
    initialize,
    hasKeys: keys.length > 0,
  };
}
