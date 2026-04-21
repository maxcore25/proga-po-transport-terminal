'use client';

import { useGetCards } from '@/entities/card';
import { useEffect, useMemo, useState } from 'react';

export function useCardSelection() {
  const { data: cards = [], isPending, isError, error } = useGetCards();
  const [selectedCardNumber, setSelectedCardNumber] = useState('');

  useEffect(() => {
    if (!selectedCardNumber && cards.length > 0) {
      setSelectedCardNumber(cards[0].cardNumber);
    }
  }, [cards, selectedCardNumber]);

  const selectedCard = useMemo(
    () => cards.find(card => card.cardNumber === selectedCardNumber) ?? null,
    [cards, selectedCardNumber]
  );

  return {
    cards,
    selectedCard,
    selectedCardNumber,
    setSelectedCardNumber,
    isPending,
    isError,
    error,
  };
}
