'use client';

import { useState } from 'react';
import { authorizePayment } from '../api/terminal.api';
import { KeyLoad, PaymentAuthResponse } from './terminal.schemas';

export type SimulatedCard = {
  uid: string;
  encryptedPayload: string;
};

export type AuthorizationUiResult = {
  variant: 'success' | 'error';
  message: string;
  code?: string;
  response?: PaymentAuthResponse;
};

type UseAuthorizationParams = {
  amount: number;
  terminalSerial: string;
  hasKeys: boolean;
  keys: KeyLoad[];
};

function decryptCardPayload(card: SimulatedCard, keys: KeyLoad[]): string {
  if (keys.length === 0) {
    throw new Error('Terminal not initialized');
  }

  if (!card.encryptedPayload.startsWith('ENC::')) {
    throw new Error('Неверный формат данных карты');
  }

  if (!card.uid.trim()) {
    throw new Error('UID карты пустой');
  }

  return card.uid.trim().toUpperCase();
}

export function createMockCard(uid: string): SimulatedCard {
  const normalizedUid = uid.trim().toUpperCase();
  return {
    uid: normalizedUid,
    encryptedPayload: `ENC::${normalizedUid}::${Date.now()}`,
  };
}

export function useAuthorization({
  amount,
  terminalSerial,
  hasKeys,
  keys,
}: UseAuthorizationParams) {
  const [result, setResult] = useState<AuthorizationUiResult | null>(null);
  const [isPending, setIsPending] = useState(false);

  const authorize = async (card: SimulatedCard) => {
    if (!hasKeys) {
      setResult({
        variant: 'error',
        message: 'Terminal not initialized',
        code: 'terminal_not_initialized',
      });
      return;
    }

    setIsPending(true);
    setResult(null);

    try {
      const cardUid = decryptCardPayload(card, keys);
      const response = await authorizePayment({
        amount,
        cardNumber: cardUid,
        terminalSerial,
      });

      setResult({
        variant: response.approved ? 'success' : 'error',
        message: response.message,
        code: response.code,
        response,
      });
    } catch (error) {
      setResult({
        variant: 'error',
        message:
          error instanceof Error ? error.message : 'Ошибка при авторизации карты',
      });
    } finally {
      setIsPending(false);
    }
  };

  return { authorize, isPending, result, setResult };
}
