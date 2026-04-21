import { BASE_API_URL } from '@/shared/config';
import {
  keysLoadResponseSchema,
  paymentAuthResponseSchema,
} from '../model/terminal.schemas';

type ApiErrorPayload = {
  error?: string;
  message?: string;
};

export type AuthorizePaymentPayload = {
  cardNumber: string;
  amount: number;
  terminalSerial: string;
};

function buildApiErrorMessage(
  payload: ApiErrorPayload | null,
  fallback: string
): string {
  return payload?.error || payload?.message || fallback;
}

async function parseJsonSafely<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function loadTerminalKeys(terminalSerial: string) {
  const url = `${BASE_API_URL}/terminal/keys?terminal_serial=${encodeURIComponent(
    terminalSerial
  )}`;
  const response = await fetch(url, { method: 'GET' });

  if (!response.ok) {
    const errorPayload = await parseJsonSafely<ApiErrorPayload>(response);
    throw new Error(
      buildApiErrorMessage(errorPayload, 'Не удалось загрузить ключи терминала')
    );
  }

  const data = await parseJsonSafely<unknown>(response);
  const parsedData = keysLoadResponseSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error('Сервер вернул некорректный пакет ключей');
  }

  return parsedData.data;
}

export async function authorizePayment(payload: AuthorizePaymentPayload) {
  const response = await fetch(`${BASE_API_URL}/terminal/authorize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorPayload = await parseJsonSafely<ApiErrorPayload>(response);
    throw new Error(
      buildApiErrorMessage(errorPayload, 'Ошибка сети при авторизации')
    );
  }

  const data = await parseJsonSafely<unknown>(response);
  const parsedData = paymentAuthResponseSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error('Сервер вернул некорректный ответ авторизации');
  }

  return parsedData.data;
}
