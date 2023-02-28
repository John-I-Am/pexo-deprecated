import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useGetDecksQuery } from "../features/api/apiSlice";
import type { RootState, AppDispatch } from "../store";
import { Card, Deck } from "../types";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useCombinedDeck = (decks: Deck[]): any => {
  let allCards: Card[] = [];
  decks.forEach((deck: Deck) => {
    if (deck.cards) {
      allCards = allCards.concat(deck.cards);
    }
  });

  return { cards: allCards };
};

export const useActiveDeck = (): Deck => {
  let activeDeck: Deck;

  const { data: allDecks = [] } = useGetDecksQuery();
  const deckId: number | null = useAppSelector((state: RootState) => state.decks.activeDeckId);
  const tags: string[] = useAppSelector((state: RootState) => state.decks.tags);

  if (deckId === null) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    activeDeck = useCombinedDeck(allDecks);
  } else {
    activeDeck = allDecks.find((deck: Deck) => deck.id === deckId);
  }

  let filteredCards;

  if (tags.length > 0) {
    // this line returns every card that has all the tags in tags array. Bit messy, refactor?
    // eslint-disable-next-line max-len
    filteredCards = activeDeck.cards?.filter((card: any) => tags.every((tag: any) => card.tags.includes(tag)));
  } else {
    filteredCards = activeDeck?.cards ?? [];
  }

  const filteredActiveDeck = { ...activeDeck, cards: filteredCards };
  return filteredActiveDeck;
};

export const useCardsDue = (cards: Card[]): Card[] => {
  const cardsDue = cards?.filter((card: any) => (
    new Date(card.checkpointDate)).getTime() <= new Date().getTime());

  return cardsDue;
};

export const useTagSelector = (decks: Deck[]): any => {
  let tags: string[] = [];
  decks.forEach((deck: Deck) => {
    if (deck?.cards) {
      deck.cards.forEach((card: any) => {
        if (card.tags) {
          tags = tags.concat(card.tags);
        }
      });
    }
  });

  return Array.from(new Set(tags));
};
