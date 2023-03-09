export interface DecodedToken {
  userId: number,
}

// @ts-ignore
declare module "express-serve-static-core" {
  // eslint-disable-next-line no-unused-vars
  interface Request {
    decodedToken: DecodedToken
  }
}

export interface UserCredentials {
  email: string,
  password: string
}

export interface UserPreferences {
  colorScheme: "light" | "dark"
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

export interface UpdatedUser {
  preferences: UserPreferences | undefined,
  email: string | undefined,
  name: string | undefined,
  surname: string | undefined,
  currentPassword: string | undefined,
  newPassword: string | undefined
}

export interface UpdatedCard {
  type: CardType | undefined,
  tags: Array<string> | undefined,
  deckId: number | undefined,
  front: string | undefined,
  back: string | undefined,
  level: number | undefined,
  audio: string| undefined,
  examples: Array<string> | undefined,
}

export interface UpdatedDeck {
  title: string,
}
