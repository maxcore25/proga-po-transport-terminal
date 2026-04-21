'use client';

import { useGetTerminals } from '@/entities/terminal';
import { useEffect, useMemo, useState } from 'react';
import { useTerminalStore } from './terminal.store';

export function useTerminalSelection() {
  const { data: terminals = [], isPending, isError, error } = useGetTerminals();
  const [selectedTerminalSerial, setSelectedTerminalSerial] = useState('');
  const initialize = useTerminalStore(state => state.initialize);

  useEffect(() => {
    if (!selectedTerminalSerial && terminals.length > 0) {
      const initialSerial = terminals[0].serialNumber;
      setSelectedTerminalSerial(initialSerial);
      void initialize(initialSerial);
    }
  }, [initialize, selectedTerminalSerial, terminals]);

  const selectedTerminal = useMemo(
    () =>
      terminals.find(terminal => terminal.serialNumber === selectedTerminalSerial) ??
      null,
    [selectedTerminalSerial, terminals]
  );

  const handleTerminalChange = async (terminalSerial: string) => {
    setSelectedTerminalSerial(terminalSerial);
    await initialize(terminalSerial);
  };

  return {
    terminals,
    selectedTerminal,
    selectedTerminalSerial,
    setSelectedTerminalSerial: handleTerminalChange,
    isPending,
    isError,
    error,
  };
}
