"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const card_1 = __importDefault(require("../models/card"));
const user_1 = __importDefault(require("../models/user"));
const deck_1 = __importDefault(require("../models/deck"));
const testingRouter = express_1.default.Router();
testingRouter.post("/reset", async (request, response) => {
    await card_1.default.sync({ force: true });
    await user_1.default.sync({ force: true });
    await deck_1.default.sync({ force: true });
    response.status(204).end();
});
exports.default = testingRouter;
