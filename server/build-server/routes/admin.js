"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const middleware_1 = __importDefault(require("../utils/middleware"));
// eslint-disable-next-line consistent-return
const isAdmin = async (request, response, next) => {
    const user = await user_1.default.findByPk(request.decodedToken.userId);
    if (user && !user.admin) {
        return response.status(401).json({ error: "operation not allowed" });
    }
    next();
};
const adminRouter = express_1.default.Router();
adminRouter.put("/:id", middleware_1.default.tokenExtractor, isAdmin, async (req, res) => {
    const user = await user_1.default.findOne({
        where: {
            id: +(req.params.id),
        },
    });
    if (user) {
        user.disabled = req.body.disable;
        await user.save();
        res.json(user);
    }
    else {
        res.status(400).end();
    }
});
