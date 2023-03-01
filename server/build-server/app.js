"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const heroku_ssl_redirect_1 = __importDefault(require("heroku-ssl-redirect"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./utils/config"));
const logger_1 = __importDefault(require("./utils/logger"));
const users_1 = __importDefault(require("./routes/users"));
const login_1 = __importDefault(require("./routes/login"));
const decks_1 = __importDefault(require("./routes/decks"));
const cards_1 = __importDefault(require("./routes/cards"));
const define_1 = __importDefault(require("./routes/define"));
const testing_1 = __importDefault(require("./routes/testing"));
const middleware_1 = __importDefault(require("./utils/middleware"));
const db_1 = __importDefault(require("./utils/db"));
const models_1 = __importDefault(require("./models"));
logger_1.default.info("connecting to", config_1.default.DATABASE_URL);
const start = async () => {
    (0, models_1.default)();
    await db_1.default.connectToDatabase();
};
start();
const app = (0, express_1.default)();
app.use(express_1.default.static("build"));
app.use(middleware_1.default.requestLogger);
app.use((0, heroku_ssl_redirect_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/users", users_1.default);
app.use("/api/login", login_1.default);
app.use("/api/decks", decks_1.default);
app.use("/api/cards", cards_1.default);
app.use("/api/define", define_1.default);
app.get("*", (request, response) => {
    response.sendFile("index.html", { root: "build" });
});
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
    app.use("/api/testing", testing_1.default);
}
app.use(middleware_1.default.unknownEndPoint);
app.use(middleware_1.default.errorHandler);
exports.default = app;
