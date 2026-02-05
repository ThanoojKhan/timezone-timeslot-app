"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const node_process_1 = require("node:process");
const app_1 = __importDefault(require("./app"));
const port = node_process_1.env.PORT || 8080;
const server = http_1.default.createServer(app_1.default);
server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
