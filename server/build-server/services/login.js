"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const authUser = async (userToAuth) => {
    const user = await user_1.default.findOne({
        where: { email: userToAuth.email },
        attributes: {
            include: ["passwordHash"],
        },
    });
    const passwordCorrect = user === null
        ? false
        : await bcrypt_1.default.compare(userToAuth.password, user.passwordHash);
    if (!(user && passwordCorrect)) {
        return false;
    }
    if (user.disabled) {
        return false;
    }
    const userToken = {
        userId: user.id,
    };
    const token = jsonwebtoken_1.default.sign(userToken, process.env.SECRET, { expiresIn: "6h" });
    return {
        token,
        userId: user.id,
    };
};
exports.default = { authUser };
