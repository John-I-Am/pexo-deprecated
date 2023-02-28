"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const card_1 = __importDefault(require("../models/card"));
const deck_1 = __importDefault(require("../models/deck"));
const createDeck = async (userId) => {
    const newDeck = await deck_1.default.create({ userId });
    return newDeck;
};
const getAllDecks = async (userId) => {
    const decks = await deck_1.default.findAll({
        where: { userId },
        include: {
            model: card_1.default,
        },
    });
    return decks;
};
const updateDeck = async (updatedTitle, deckId) => {
    const deck = await deck_1.default.findByPk(deckId);
    if (deck) {
        deck.title = updatedTitle;
        await deck.save();
    }
    return deck;
};
const deleteDeck = async (deckId) => {
    const deck = await deck_1.default.findByPk(deckId);
    if (deck) {
        await deck.destroy();
    }
    return deck;
};
exports.default = {
    createDeck,
    getAllDecks,
    updateDeck,
    deleteDeck,
};
