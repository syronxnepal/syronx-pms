"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./src/app"));
const socket_1 = __importDefault(require("./src/socket"));
dotenv_1.default.config();
const { SERVER_HOST, SERVER_PORT, NODE_ENV } = process.env;
const app = (0, app_1.default)();
const server = http.createServer(app);
(0, socket_1.default)(server);
server.listen(process.env.PORT || SERVER_PORT, () => {
    console.log(`Server started at ${SERVER_HOST}:${SERVER_PORT} for environment ${NODE_ENV}`);
});
//# sourceMappingURL=server.js.map