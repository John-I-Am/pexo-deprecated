"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const deck_1 = __importDefault(require("../models/deck"));
const card_1 = __importDefault(require("../models/card"));
const usersInDb = async () => {
    const users = await user_1.default.findAll({});
    return users.map((user) => user.toJSON());
};
const decksInDb = async () => {
    const decks = await deck_1.default.findAll({});
    return decks.map((deck) => deck.toJSON());
};
const cardsInDb = async () => {
    const cards = await card_1.default.findAll({});
    return cards.map((card) => card.toJSON());
};
exports.default = { usersInDb, decksInDb, cardsInDb };
