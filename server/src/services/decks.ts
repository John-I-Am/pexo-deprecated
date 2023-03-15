import Card from "../models/card";
import Deck from "../models/deck";

const createDeck = async (userId: number): Promise<Deck> => {
  const newDeck: Deck = await Deck.create({ userId });
  return newDeck;
};

const getAllDecks = async (userId: number): Promise<Deck[]> => {
  const decks: Deck[] = await Deck.findAll({
    where: { userId },
    include: {
      model: Card,
    },
  });
  return decks;
};

const updateDeck = async (
  updatedTitle: string,
  updatedDescription: string,
  deckId: number,
): Promise<Deck | null> => {
  const deck: Deck | null = await Deck.findByPk(deckId);
  if (deck) {
    deck.title = updatedTitle;
    deck.description = updatedDescription || deck.description;
    await deck.save();
  }
  return deck;
};

const deleteDeck = async (deckId: number): Promise<Deck | null> => {
  const deck: Deck | null = await Deck.findByPk(deckId);
  if (deck) {
    await deck.destroy();
  }
  return deck;
};

export default {
  createDeck,
  getAllDecks,
  updateDeck,
  deleteDeck,
};
