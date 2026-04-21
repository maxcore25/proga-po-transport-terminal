'use client';

import { useMutation } from '@tanstack/react-query';
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
  const mutation = useMutation<PaymentAuthResponse, Error, SimulatedCard>({
    mutationFn: async card => {
      if (!hasKeys) {
        throw new Error('Terminal not initialized');
      }
      const cardUid = decryptCardPayload(card, keys);
      return authorizePayment({
        amount,
        cardNumber: cardUid,
        terminalSerial,
      });
    },
  });

  const result: AuthorizationUiResult | null = mutation.data
    ? {
        variant: mutation.data.approved ? 'success' : 'error',
        message: mutation.data.message,
        code: mutation.data.code,
        response: mutation.data,
      }
    : mutation.error
      ? {
          variant: 'error',
          message: mutation.error.message || 'Ошибка при авторизации карты',
        }
      : null;

  const authorize = async (card: SimulatedCard) => {
    await mutation.mutateAsync(card);
  };

  return { authorize, isPending: mutation.isPending, result };
}
