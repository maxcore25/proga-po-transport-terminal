import { Card } from '@/entities/card';
import { UpdateCardFormValues } from './update-card.schema';

function expiresToLocalInput(iso: string | null | undefined) {
  if (!iso) return '';
  return new Date(iso).toISOString().slice(0, 16);
}

export function mapCardToFormValues(card: Card): UpdateCardFormValues {
  return {
    cardNumber: card.cardNumber,
    ownerName: card.ownerName,
    keyId: card.keyId,
    balance: card.balance,
    isBlocked: card.isBlocked,
    blockReason: card.blockReason ?? '',
    expiresAt: expiresToLocalInput(card.expiresAt),
  };
}
