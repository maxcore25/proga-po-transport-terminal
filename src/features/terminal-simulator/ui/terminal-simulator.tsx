'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { createMockCard, useAuthorization } from '../model/use-authorization';
import { TerminalProvider, useTerminal } from '../model/use-terminal';

const DEFAULT_FARE_AMOUNT = 3500;
const FALLBACK_UID = 'A1B2C3D4';

function StatusBadge({
  isSuccess,
  text,
}: {
  isSuccess: boolean;
  text: string;
}) {
  return (
    <span
      className={
        isSuccess
          ? 'inline-flex rounded-md bg-emerald-500/15 px-2 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300'
          : 'inline-flex rounded-md bg-red-500/15 px-2 py-1 text-xs font-medium text-red-700 dark:text-red-300'
      }
    >
      {text}
    </span>
  );
}

function TerminalSimulatorContent() {
  const { terminalSerial, status, errorMessage, hasKeys, keys, initialize } =
    useTerminal();
  const [manualUid, setManualUid] = useState('');

  const { authorize, isPending, result } = useAuthorization({
    amount: DEFAULT_FARE_AMOUNT,
    terminalSerial,
    hasKeys,
    keys,
  });

  const handleTapCard = async () => {
    const uid = manualUid.trim() || FALLBACK_UID;
    await authorize(createMockCard(uid));
  };

  return (
    <main className='mx-auto flex w-full max-w-2xl flex-col gap-4 p-4 md:p-6'>
      <Card>
        <CardHeader>
          <CardTitle>Симулятор терминала оплаты</CardTitle>
          <CardDescription>
            Серийный номер терминала: <strong>{terminalSerial}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-3'>
          <div className='flex items-center justify-between gap-3'>
            <span className='text-sm text-muted-foreground'>Статус терминала</span>
            <StatusBadge
              isSuccess={status === 'initialized'}
              text={status === 'initialized' ? 'Инициализирован' : 'Не готов'}
            />
          </div>

          <div className='flex items-center justify-between gap-3'>
            <span className='text-sm text-muted-foreground'>Ключей загружено</span>
            <span className='text-sm font-medium'>{keys.length}</span>
          </div>

          {status === 'error' && (
            <p className='text-sm text-red-600 dark:text-red-400'>
              Ошибка инициализации: {errorMessage || 'неизвестная ошибка'}
            </p>
          )}

          <Button
            type='button'
            variant='outline'
            onClick={() => void initialize()}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Загрузка ключей...' : 'Переинициализировать'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Имитация прикладывания карты</CardTitle>
          <CardDescription>
            Укажите UID вручную или используйте тестовый UID по умолчанию.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-3'>
          <div className='space-y-1.5'>
            <label htmlFor='manual-uid' className='text-sm font-medium'>
              UID карты
            </label>
            <Input
              id='manual-uid'
              value={manualUid}
              onChange={event => setManualUid(event.target.value)}
              placeholder={FALLBACK_UID}
            />
          </div>

          <Button type='button' onClick={() => void handleTapCard()} disabled={isPending}>
            {isPending ? 'Авторизация...' : 'Приложить карту'}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Результат авторизации</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <StatusBadge
              isSuccess={result.variant === 'success'}
              text={result.variant === 'success' ? 'Оплата одобрена' : 'Оплата отклонена'}
            />
            <p
              className={
                result.variant === 'success'
                  ? 'text-sm text-emerald-700 dark:text-emerald-300'
                  : 'text-sm text-red-700 dark:text-red-300'
              }
            >
              {result.message}
            </p>
            {result.code && (
              <p className='text-xs text-muted-foreground'>Код ответа: {result.code}</p>
            )}
          </CardContent>
        </Card>
      )}
    </main>
  );
}

export function TerminalSimulator() {
  return (
    <TerminalProvider>
      <TerminalSimulatorContent />
    </TerminalProvider>
  );
}
