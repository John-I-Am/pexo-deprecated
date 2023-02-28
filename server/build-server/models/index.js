"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const card_1 = __importDefault(require("./card"));
const deck_1 = __importDefault(require("./deck"));
const user_1 = __importDefault(require("./user"));
const joinDb = async () => {
    user_1.default.hasMany(deck_1.default);
    user_1.default.hasMany(card_1.default);
    deck_1.default.belongsTo(user_1.default);
    deck_1.default.hasMany(card_1.default);
    card_1.default.belongsTo(deck_1.default);
    card_1.default.belongsTo(user_1.default);
};
exports.default = joinDb;
