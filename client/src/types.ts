export interface UserCredentials {
  email: string,
  password: string
}

export interface NewUser {
  email: string,
  name: string,
  surname: string,
  password: string,
}

export type CardType = "classic" | "cloze"

export interface DictionaryEntry {
  definition: string,
  pronunciation: string,
  examples: string[],
}

export interface NewCard {
  deckId: number,
  type: CardType,
  tags: Array<string> | undefined,
  front: string,
  back: string,
  audio: string | undefined
  examples: Array<string> | undefined,
}

export interface Card extends NewCard {
  id: number,
  level: number,
  creationDate: Date,
  checkpointDate: Date,
}

export interface Deck {
  userId: number,
  id: number
  title: string,
  creationDate: Date,
  cards: Array<Card> | undefined,
}

export interface CombinedDeck {
  title: "",
  cards: Array<Card>
}
