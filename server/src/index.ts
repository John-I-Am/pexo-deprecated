/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-expressions */
import http from "http";
import config from "./utils/config";
import app from "./app";
import logger from "./utils/logger";

require("ts-node/register"); // ??????? <=== app suddenly needs this line to function dispite changing nothing

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
