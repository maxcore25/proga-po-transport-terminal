import { BASE_API_URL } from '@/shared/config';
import axios from 'axios';
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

export async function loadTerminalKeys(terminalSerial: string) {
  try {
    const { data } = await axios.get(`${BASE_API_URL}/terminal/keys`, {
      params: {
        terminal_serial: terminalSerial,
      },
    });
    const parsedData = keysLoadResponseSchema.safeParse(data);

    if (!parsedData.success) {
      throw new Error('Сервер вернул некорректный пакет ключей');
    }

    return parsedData.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorPayload = error.response?.data as ApiErrorPayload | undefined;
      throw new Error(
        buildApiErrorMessage(errorPayload ?? null, 'Не удалось загрузить ключи терминала')
      );
    }

    throw error;
  }
}

export async function authorizePayment(payload: AuthorizePaymentPayload) {
  try {
    const { data } = await axios.post(`${BASE_API_URL}/terminal/authorize`, payload);
    const parsedData = paymentAuthResponseSchema.safeParse(data);

    if (!parsedData.success) {
      throw new Error('Сервер вернул некорректный ответ авторизации');
    }

    return parsedData.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorPayload = error.response?.data as ApiErrorPayload | undefined;
      throw new Error(buildApiErrorMessage(errorPayload ?? null, 'Ошибка сети при авторизации'));
    }

    throw error;
  }
}
