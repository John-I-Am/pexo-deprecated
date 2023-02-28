"use strict";
const sequelize_1 = require("sequelize");
module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable("decks", {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: sequelize_1.DataTypes.STRING,
                defaultValue: "untitled",
                allowNull: false,
            },
            created_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            updated_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
        });
        await queryInterface.createTable("cards", {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            tags: {
                type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
            },
            type: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            front: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            back: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            audio: {
                type: sequelize_1.DataTypes.STRING,
            },
            examples: {
                type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
            },
            level: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: 0,
                    max: 5,
                },
            },
            checkpoint_date: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            created_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            updated_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
        });
        await queryInterface.createTable("users", {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            admin: {
                type: sequelize_1.DataTypes.BOOLEAN,
                defaultValue: false,
            },
            disabled: {
                type: sequelize_1.DataTypes.BOOLEAN,
                defaultValue: false,
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    isEmail: true,
                },
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            surname: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            password_hash: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            created_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            updated_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
        });
        await queryInterface.addColumn("cards", "user_id", {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: { model: "users", key: "id" },
        });
        await queryInterface.addColumn("cards", "deck_id", {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: { model: "decks", key: "id" },
        });
        await queryInterface.addColumn("decks", "user_id", {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: { model: "users", key: "id" },
        });
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable("cards");
        await queryInterface.dropTable("decks");
        await queryInterface.dropTable("users");
    },
};
