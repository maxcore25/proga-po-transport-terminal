'use client';

import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { createMockCard, useAuthorization } from '../model/use-authorization';
import { useCardSelection } from '../model/use-card-selection';
import { useTerminal } from '../model/use-terminal';
import { useTerminalSelection } from '../model/use-terminal-selection';
import { formatBalanceRub } from '@/shared/lib/utils';
import { Label } from '@/shared/ui/label';

const DEFAULT_FARE_AMOUNT = 3500;

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
  const {
    terminals,
    selectedTerminal,
    selectedTerminalSerial,
    setSelectedTerminalSerial,
    isPending: isTerminalsPending,
    isError: isTerminalsError,
    error: terminalsError,
  } = useTerminalSelection();
  const {
    cards,
    selectedCard,
    selectedCardNumber,
    setSelectedCardNumber,
    isPending: isCardsPending,
    isError: isCardsError,
    error: cardsError,
  } = useCardSelection();

  const { authorize, isPending, result } = useAuthorization({
    amount: DEFAULT_FARE_AMOUNT,
    terminalSerial,
    hasKeys,
    keys,
  });

  const handleTapCard = async () => {
    if (!selectedCard) {
      return;
    }
    await authorize(createMockCard(selectedCard.cardNumber));
  };

  return (
    <main className='mx-auto flex w-full max-w-2xl flex-col gap-4 p-4 md:p-6'>
      <Card>
        <CardHeader>
          <CardTitle>Симулятор терминала</CardTitle>
          <CardDescription>
            Выберите терминал, чтобы загрузить его ключи.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-3'>
          <div className='space-y-1.5'>
            <Label htmlFor='terminal-select'>Терминал</Label>
            <Select
              value={selectedTerminalSerial}
              onValueChange={value => void setSelectedTerminalSerial(value)}
              disabled={isTerminalsPending || terminals.length === 0}
            >
              <SelectTrigger id='terminal-select' className='w-full'>
                <SelectValue
                  placeholder={
                    isTerminalsPending
                      ? 'Загрузка терминалов...'
                      : 'Выберите терминал'
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {terminals.map(terminal => (
                  <SelectItem key={terminal.id} value={terminal.serialNumber}>
                    {`${terminal.serialNumber} - ${terminal.name}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isTerminalsError && (
            <p className='text-sm text-red-600 dark:text-red-400'>
              Ошибка загрузки терминалов:{' '}
              {terminalsError instanceof Error
                ? terminalsError.message
                : 'неизвестная ошибка'}
            </p>
          )}

          {!isTerminalsPending && terminals.length === 0 && (
            <p className='text-sm text-amber-600 dark:text-amber-400'>
              Нет доступных терминалов. Создайте терминал в системе.
            </p>
          )}

          {selectedTerminal && (
            <>
              <div className='flex items-center justify-between gap-3'>
                <span className='text-muted-foreground text-sm'>
                  Серийный номер
                </span>
                <span className='text-sm font-medium'>
                  {selectedTerminal.serialNumber}
                </span>
              </div>
              <div className='flex items-center justify-between gap-3'>
                <span className='text-muted-foreground text-sm'>Название</span>
                <span className='text-sm font-medium'>
                  {selectedTerminal.name}
                </span>
              </div>
              <div className='flex items-center justify-between gap-3'>
                <span className='text-muted-foreground text-sm'>
                  Расположение
                </span>
                <span className='text-sm font-medium'>
                  {selectedTerminal.location}
                </span>
              </div>
            </>
          )}

          <div className='flex items-center justify-between gap-3'>
            <span className='text-muted-foreground text-sm'>
              Статус терминала
            </span>
            <StatusBadge
              isSuccess={status === 'initialized'}
              text={status === 'initialized' ? 'Инициализирован' : 'Не готов'}
            />
          </div>

          <div className='flex items-center justify-between gap-3'>
            <span className='text-muted-foreground text-sm'>
              Ключей загружено
            </span>
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
            onClick={() =>
              void initialize(selectedTerminalSerial || terminalSerial)
            }
            disabled={
              status === 'loading' ||
              (!selectedTerminal && terminals.length > 0)
            }
          >
            {status === 'loading'
              ? 'Загрузка ключей...'
              : 'Переинициализировать'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Имитация прикладывания карты</CardTitle>
          <CardDescription>
            Выберите существующую карту, чтобы приложить к терминалу.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-3'>
          <div className='space-y-1.5'>
            <Label htmlFor='card-number-select'>Карта</Label>
            <Select
              value={selectedCardNumber}
              onValueChange={setSelectedCardNumber}
              disabled={isCardsPending || cards.length === 0}
            >
              <SelectTrigger id='card-number-select' className='w-full'>
                <SelectValue
                  placeholder={
                    isCardsPending
                      ? 'Загрузка карт...'
                      : 'Выберите карту для оплаты'
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {cards.map(card => (
                  <SelectItem key={card.id} value={card.cardNumber}>
                    {`${card.cardNumber} - ${card.ownerName}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isCardsError && (
            <p className='text-sm text-red-600 dark:text-red-400'>
              Ошибка загрузки карт:{' '}
              {cardsError instanceof Error
                ? cardsError.message
                : 'неизвестная ошибка'}
            </p>
          )}

          {!isCardsPending && cards.length === 0 && (
            <p className='text-sm text-amber-600 dark:text-amber-400'>
              Нет доступных карт. Создайте карту в системе перед авторизацией.
            </p>
          )}

          <Button
            type='button'
            onClick={() => void handleTapCard()}
            disabled={isPending || !selectedCard || isCardsPending}
          >
            {isPending ? 'Авторизация...' : 'Приложить карту'}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Результат авторизации платежа</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <StatusBadge
              isSuccess={result.variant === 'success'}
              text={
                result.variant === 'success'
                  ? 'Оплата одобрена'
                  : 'Оплата отклонена'
              }
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
              <p className='text-muted-foreground text-xs'>
                Код ответа: {result.code}
              </p>
            )}
            {typeof result.response?.balanceAfter === 'number' && (
              <p className='text-muted-foreground text-xs'>
                Баланс после списания:{' '}
                {formatBalanceRub(result.response.balanceAfter)}
              </p>
            )}
            {result.response?.processedAt && (
              <p className='text-muted-foreground text-xs'>
                Время обработки:{' '}
                {new Date(result.response.processedAt).toLocaleString()}
              </p>
            )}
            {result.response?.transactionId && (
              <p className='text-muted-foreground text-xs'>
                ID транзакции: {result.response.transactionId}
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </main>
  );
}

export function TerminalSimulator() {
  return <TerminalSimulatorContent />;
}
