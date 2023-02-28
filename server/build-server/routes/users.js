"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeguards_1 = __importDefault(require("../typeguards"));
const users_1 = __importDefault(require("../services/users"));
const middleware_1 = __importDefault(require("../utils/middleware"));
const usersRouter = express_1.default.Router();
usersRouter.post("/", async (request, response) => {
    const newUser = typeguards_1.default.toNewUser(request.body);
    const user = await users_1.default.createUser(newUser);
    response.json(user);
});
usersRouter.get("/", async (request, response) => {
    const users = await users_1.default.getAllUsers();
    response.json(users);
});
usersRouter.get("/:id", middleware_1.default.tokenExtractor, async (request, response) => {
    const user = await users_1.default.getUser(request.params.id);
    if (user) {
        response.json(user);
    }
    else {
        response.status(404).end();
    }
});
usersRouter.put("/:id", middleware_1.default.tokenExtractor, async (request, response) => {
    const updatedUser = typeguards_1.default.toUpdatedUser(request.body);
    const user = await users_1.default.updateUser(updatedUser, +request.params.id);
    if (user) {
        response.json(user);
    }
    response.status(401).json({ error: "invalid credentials" });
});
usersRouter.delete("/:id", middleware_1.default.tokenExtractor, async (request, response) => {
    const deletedUser = await users_1.default.deleteUser(request.params.id);
    if (deletedUser) {
        response.status(204).end();
    }
    response.status(404).json({ error: "user not found" });
});
exports.default = usersRouter;
