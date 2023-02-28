"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const deck_1 = __importDefault(require("../models/deck"));
const createUser = async (newUser) => {
    const { email, name, surname, password, } = newUser;
    const passwordHash = await bcrypt_1.default.hash(password, 10);
    const savedUser = await user_1.default.create({
        email,
        name,
        surname,
        passwordHash,
    });
    const userNoHash = user_1.default.findByPk(savedUser.id, {
        attributes: { exclude: ["passwordHash"] },
    });
    return userNoHash;
};
const getUser = async (userId) => {
    const user = await user_1.default.findByPk(userId, {
        attributes: { exclude: ["passwordHash"] },
    });
    return user;
};
const getAllUsers = async () => user_1.default.findAll({
    include: [{
            model: deck_1.default,
        }],
});
const updateUser = async (updatedUser, userId) => {
    const { email, name, surname, currentPassword, newPassword, } = updatedUser;
    const userToUpdate = await user_1.default.findByPk(userId);
    if (userToUpdate) {
        userToUpdate.set({
            ...userToUpdate,
            name: name || userToUpdate.name,
            surname: surname || userToUpdate.surname,
        });
        if (newPassword) {
            const newPasswordHash = await bcrypt_1.default.hash(newPassword, 10);
            const passwordCorrect = await bcrypt_1.default.compare(currentPassword, userToUpdate.passwordHash);
            if (!(passwordCorrect)) {
                return null;
            }
            userToUpdate.passwordHash = newPasswordHash;
        }
        if (email) {
            const emailTaken = await user_1.default.findOne({
                where: {
                    email,
                },
            });
            if (!emailTaken) {
                userToUpdate.email = email;
            }
        }
    }
    else {
        return null;
    }
    await userToUpdate.save();
    const userNoHash = await user_1.default.findByPk(userToUpdate.id, {
        attributes: { exclude: ["passwordHash"] },
    });
    return userNoHash;
};
const deleteUser = async (userId) => {
    const userToDelete = await user_1.default.findByPk(userId);
    if (userToDelete) {
        await userToDelete.destroy();
    }
    return userToDelete;
};
exports.default = {
    createUser, getAllUsers, getUser, updateUser, deleteUser,
};
