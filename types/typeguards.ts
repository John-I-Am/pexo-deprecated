/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import {
  CardContent,
  CardContentClassic,
  CardContentCloze,
  NewCard, NewUser, UpdatedCard, UpdatedDeck, UpdatedUser, UserCredentials, UserPreferences,
} from "./types";

const isString = (text: unknown): text is string => typeof text === "string" || text instanceof String;

const isArray = (array: unknown): array is Array<any> => Array.isArray(array);

const isNumber = (value: unknown): value is number => typeof value === "number";

const parseTextContent = (content: unknown): string => {
  const error = new Error("Incorrect type or missing text content");
  error.name = "ParseError";
  if ((!content && content !== "") || !isString(content)) {
    throw error;
  }

  return content;
};

const parseArrayContent = (content: any): Array<any> => {
  const error = new Error("Incorrect type or missing array content");
  error.name = "ParseError";
  if (!content || !isArray(content)) {
    throw error;
  }

  return content;
};

const parseNumberContent = (content: unknown): number => {
  const error = new Error("Incorrect type of missing number content");
  error.name = "ParseError";
  if ((!content || !isNumber(content)) && (content !== 0)) {
    throw error;
  }

  return content;
};

const parseCardContent = (content: unknown): CardContent => {
  const error = new Error("Incorrect type or missing card content");
  error.name = "ParseError";
  if (!content) {
    throw error;
  }

  let cardContent;

  if ((content as CardContentClassic).type === "classic") {
    const cardContentClassic: CardContentClassic = {
      type: "classic",
      front: parseTextContent((content as CardContentClassic).front),
      back: parseTextContent((content as CardContentClassic).back),
    };

    cardContent = cardContentClassic;
  }

  if ((content as CardContentCloze).type === "cloze") {
    const cardContentCloze: CardContentCloze = {
      type: "cloze",
      hint: parseTextContent((content as CardContentCloze).hint),
      text: ((content as CardContentCloze).text),
    };

    cardContent = cardContentCloze;
  }

  return cardContent as CardContent;
};

export const toNewUser = (object: any): NewUser => {
  const newUser: NewUser = {
    email: parseTextContent(object.email),
    name: parseTextContent(object.name),
    surname: parseTextContent(object.surname),
    password: parseTextContent(object.password),
  };

  return newUser;
};

export const toUpdatedUser = (object: any): UpdatedUser => {
  const updatedUser: UpdatedUser = {
    preferences: object.preferences,
    email: object.email !== undefined ? parseTextContent(object.email) : undefined,
    name: object.name !== undefined ? parseTextContent(object.name) : undefined,
    surname: object.surname !== undefined ? parseTextContent(object.surname) : undefined,
    currentPassword: object.currentPassword !== undefined ? parseTextContent(object.currentPassword) : undefined,
    newPassword: object.newPassword !== undefined ? parseTextContent(object.newPassword) : undefined,
  };

  return updatedUser;
};

export const toUserCredential = (object: any): UserCredentials => {
  const userCredential: UserCredentials = {
    email: parseTextContent(object.email),
    password: parseTextContent(object.password),
  };

  return userCredential;
};

export const toNewCard = (object: any): NewCard => {
  const newCard: NewCard = {
    tags: object.tags !== undefined ? parseArrayContent(object.tags) : undefined,
    deckId: parseNumberContent(object.deckId),
    content: parseCardContent(object.content),
    // audio: object.audio !== undefined ? parseTextContent(object.audio) : undefined,
    audio: object.audio ? parseTextContent(object.audio) : undefined,
    examples: object.examples !== undefined ? parseArrayContent(object.examples) : undefined,
  };

  return newCard;
};

export const toUpdatedCard = (object: any): UpdatedCard => {
  const updatedCard: UpdatedCard = {
    tags: object.tags !== undefined ? parseArrayContent(object.tags) : undefined,
    deckId: object.deckId !== undefined ? parseNumberContent(object.deckId) : undefined,
    content: object.content !== undefined ? parseCardContent(object.content) : undefined,
    level: object.level !== undefined ? parseNumberContent(object.level) : undefined,
    audio: object.audio ? parseTextContent(object.audio) : "",
    examples: object.examples !== undefined ? parseArrayContent(object.examples) : undefined,
  };

  return updatedCard;
};

export const toUpdatedDeck = (object: any): UpdatedDeck => {
  const updatedDeck: UpdatedDeck = {
    title: parseTextContent(object.title),
  };

  return updatedDeck;
};
