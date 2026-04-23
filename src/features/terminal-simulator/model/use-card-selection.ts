'use client';

import { useGetCards } from '@/entities/card';
import { useMemo, useState } from 'react';

export function useCardSelection() {
  const { data: cards = [], isPending, isError, error } = useGetCards();
  const [selectedCardNumber, setSelectedCardNumber] = useState('');
  const effectiveSelectedCardNumber = selectedCardNumber || cards[0]?.cardNumber || '';

  const selectedCard = useMemo(
    () => cards.find(card => card.cardNumber === effectiveSelectedCardNumber) ?? null,
    [cards, effectiveSelectedCardNumber]
  );

  return {
    cards,
    selectedCard,
    selectedCardNumber: effectiveSelectedCardNumber,
    setSelectedCardNumber,
    isPending,
    isError,
    error,
  };
}
