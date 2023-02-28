"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const decks_1 = __importDefault(require("../services/decks"));
const middleware_1 = __importDefault(require("../utils/middleware"));
const decksRouter = express_1.default.Router();
decksRouter.post("/", middleware_1.default.tokenExtractor, async (request, response) => {
    const newDeck = await decks_1.default.createDeck(request.decodedToken.userId);
    response.json(newDeck);
});
decksRouter.get("/", middleware_1.default.tokenExtractor, async (request, response) => {
    const decks = await decks_1.default.getAllDecks(request.decodedToken.userId);
    response.json(decks);
});
decksRouter.put("/:id", middleware_1.default.tokenExtractor, async (request, response) => {
    const updatedDeck = await decks_1.default.updateDeck(request.body.title, +request.params.id);
    if (updatedDeck) {
        response.json(updatedDeck);
    }
    else {
        response.status(404).json({ error: "deck not found" });
    }
});
decksRouter.delete("/:id", middleware_1.default.tokenExtractor, async (request, response) => {
    const deletedDeck = await decks_1.default.deleteDeck(+request.params.id);
    if (deletedDeck) {
        response.status(204).end();
    }
    response.status(404).end();
});
exports.default = decksRouter;
