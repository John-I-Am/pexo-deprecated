"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_1 = __importDefault(require("../services/login"));
const typeguards_1 = __importDefault(require("../typeguards"));
const loginRouter = express_1.default.Router();
loginRouter.post("/", async (request, response) => {
    const userCredential = typeguards_1.default.toUserCredential(request.body);
    const result = await login_1.default.authUser(userCredential);
    if (result) {
        response.status(200).send(result);
    }
    else {
        response.status(401).json({ error: "invalid credentials" });
    }
});
exports.default = loginRouter;
