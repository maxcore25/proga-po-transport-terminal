'use client';

import { useGetTerminals } from '@/entities/terminal';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTerminalStore } from './terminal.store';

export function useTerminalSelection() {
  const { data: terminals = [], isPending, isError, error } = useGetTerminals();
  const [selectedTerminalSerial, setSelectedTerminalSerial] = useState('');
  const initialize = useTerminalStore(state => state.initialize);
  const lastInitializedSerialRef = useRef<string | null>(null);
  const effectiveSelectedTerminalSerial =
    selectedTerminalSerial || terminals[0]?.serialNumber || '';

  useEffect(() => {
    if (
      effectiveSelectedTerminalSerial &&
      lastInitializedSerialRef.current !== effectiveSelectedTerminalSerial
    ) {
      lastInitializedSerialRef.current = effectiveSelectedTerminalSerial;
      void initialize(effectiveSelectedTerminalSerial);
    }
  }, [effectiveSelectedTerminalSerial, initialize]);

  const selectedTerminal = useMemo(
    () =>
      terminals.find(
        terminal => terminal.serialNumber === effectiveSelectedTerminalSerial
      ) ?? null,
    [effectiveSelectedTerminalSerial, terminals]
  );

  const handleTerminalChange = (terminalSerial: string) => {
    setSelectedTerminalSerial(terminalSerial);
  };

  return {
    terminals,
    selectedTerminal,
    selectedTerminalSerial: effectiveSelectedTerminalSerial,
    setSelectedTerminalSerial: handleTerminalChange,
    isPending,
    isError,
    error,
  };
}
