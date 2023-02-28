"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const card_1 = __importDefault(require("../models/card"));
const deck_1 = __importDefault(require("../models/deck"));
const createCard = async (deckId, cardToCreate) => {
    const savedDeck = await deck_1.default.findByPk(deckId);
    if (savedDeck) {
        const savedCard = await card_1.default.create({
            ...cardToCreate,
            checkpointDate: new Date(),
            level: 0,
            deckId: savedDeck.id,
            userId: savedDeck.userId,
        });
        return savedCard;
    }
    return null;
};
const getAllCards = async (userId) => {
    const savedCards = await card_1.default.findAll({ where: { userId } });
    return savedCards;
};
const getCard = async (cardId) => {
    const card = await card_1.default.findByPk(cardId);
    return card;
};
const updateCard = async (updatedCard, cardId) => {
    const cardToUpdate = await card_1.default.findByPk(cardId);
    const currentCheckpoint = cardToUpdate.checkpointDate.getTime();
    let interval = 0;
    if (updatedCard.level || updatedCard.level === 0) {
        // formula for adding time: min * 60000
        switch (updatedCard.level) {
            case 0:
                // 15 minutes
                interval = (15 * 60000);
                break;
            case 1:
                // 2 hours
                interval = (120 * 60000);
                break;
            case 2:
                // 8 hours
                interval = (480 * 60000);
                break;
            case 3:
                // 1 day
                interval = (1440 * 60000);
                break;
            case 4:
                // 3 days
                interval = (4320 * 60000);
                break;
            case 5:
                // 1 week
                interval = (10080 * 60000);
                break;
            default:
                interval = 0;
                break;
        }
    }
    cardToUpdate.update({
        ...updatedCard,
        checkpointDate: new Date(currentCheckpoint + interval),
    });
    await cardToUpdate.save();
    return cardToUpdate;
};
const deleteCard = async (cardId) => {
    const card = await card_1.default.findByPk(cardId);
    if (card) {
        await card.destroy();
    }
    return card;
};
exports.default = {
    createCard, getAllCards, getCard, updateCard, deleteCard,
};
