"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cards_1 = __importDefault(require("../services/cards"));
const typeguards_1 = __importDefault(require("../typeguards"));
const middleware_1 = __importDefault(require("../utils/middleware"));
const cardsRouter = express_1.default.Router();
cardsRouter.post("/", middleware_1.default.tokenExtractor, async (request, response) => {
    const newCard = typeguards_1.default.toNewCard(request.body);
    const savedCard = await cards_1.default.createCard(request.body.deckId, newCard);
    if (savedCard) {
        response.json(savedCard);
    }
    else {
        response.status(404).json({ error: "Deck does not exist" });
    }
});
cardsRouter.get("/", middleware_1.default.tokenExtractor, async (request, response) => {
    const cards = await cards_1.default.getAllCards(request.decodedToken.userId);
    response.json(cards);
});
cardsRouter.get("/:id", middleware_1.default.tokenExtractor, async (request, response) => {
    const card = await cards_1.default.getCard(request.params.id);
    response.json(card);
});
cardsRouter.put("/:id", middleware_1.default.tokenExtractor, async (request, response) => {
    const updatedCard = typeguards_1.default.toUpdatedCard(request.body);
    const result = await cards_1.default.updateCard(updatedCard, +request.params.id);
    response.json(result);
});
cardsRouter.delete("/:id", middleware_1.default.tokenExtractor, async (request, response) => {
    const deletedCard = await cards_1.default.deleteCard(+request.params.id);
    if (deletedCard) {
        response.status(204).end();
    }
    response.status(404).end();
});
exports.default = cardsRouter;
