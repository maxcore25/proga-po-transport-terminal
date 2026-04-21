'use client';

import { create } from 'zustand';
import { loadTerminalKeys } from '../api/terminal.api';
import { KeyLoad } from './terminal.schemas';

export const TERMINAL_SERIAL = 'TRM-001-BUS';

export type TerminalStatus = 'idle' | 'loading' | 'initialized' | 'error';

type TerminalState = {
  terminalSerial: string;
  keys: KeyLoad[];
  issuedAt: string | null;
  status: TerminalStatus;
  errorMessage: string | null;
};

type TerminalActions = {
  initialize: () => Promise<void>;
  reset: () => void;
};

type TerminalStore = TerminalState & TerminalActions;

const initialTerminalState: TerminalState = {
  terminalSerial: TERMINAL_SERIAL,
  keys: [],
  issuedAt: null,
  status: 'idle',
  errorMessage: null,
};

export const useTerminalStore = create<TerminalStore>(set => ({
  ...initialTerminalState,

  initialize: async () => {
    set({
      status: 'loading',
      errorMessage: null,
    });

    try {
      const response = await loadTerminalKeys(TERMINAL_SERIAL);
      set({
        keys: response.keys,
        issuedAt: response.issuedAt,
        status: 'initialized',
        errorMessage: null,
      });
    } catch (error) {
      set({
        keys: [],
        issuedAt: null,
        status: 'error',
        errorMessage:
          error instanceof Error ? error.message : 'Неизвестная ошибка инициализации',
      });
    }
  },

  reset: () => set({ ...initialTerminalState }),
}));
