"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const umzug_1 = require("umzug");
const config_1 = __importDefault(require("./config"));
const logger_1 = __importDefault(require("./logger"));
const sequelize = new sequelize_1.Sequelize(config_1.default.DATABASE_URL, {
    dialectOptions: {
        ssl: process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development"
            ? null
            : {
                require: true,
                rejectUnauthorized: false,
            },
    },
    logging: false,
});
const migrationConf = {
    migrations: {
        glob: "src/migrations/*.{js,ts}",
    },
    storage: new umzug_1.SequelizeStorage({ sequelize, tableName: "migrations" }),
    context: sequelize.getQueryInterface(),
    logger: console,
};
const runMigrations = async () => {
    const migrator = new umzug_1.Umzug(migrationConf);
    const migrations = await migrator.up();
    console.log("Migrations up to date", {
        files: migrations.map((mig) => mig.name),
    });
};
const rollbackMigration = async () => {
    await sequelize.authenticate();
    const migrator = new umzug_1.Umzug(migrationConf);
    await migrator.down();
};
const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        if (process.env.NODE_ENV !== "test") {
            await runMigrations();
        }
        logger_1.default.info("connected to database", config_1.default.DATABASE_URL);
    }
    catch (error) {
        logger_1.default.error("failed to connect to the database", error.message);
        return process.exit(1);
    }
    return null;
};
exports.default = { connectToDatabase, sequelize, rollbackMigration };
