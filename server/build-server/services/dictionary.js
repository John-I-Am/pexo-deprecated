"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../utils/config"));
const define = async (word) => {
    const response = await fetch(`https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${word}?fields=definitions%2Cexamples%2Cpronunciations&strictMatch=false`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            app_id: config_1.default.OXFORD_APP_ID,
            app_key: config_1.default.OXFORD_APP_KEY,
        },
    });
    return response.json();
};
const define2 = async (word) => {
    const response = await fetch(`https://od-api.oxforddictionaries.com/api/v2/sentences/en/${word}?strictMatch=false
  `, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            app_id: config_1.default.OXFORD_APP_ID,
            app_key: config_1.default.OXFORD_APP_KEY,
        },
    });
    return response.json();
};
exports.default = { define, define2 };
