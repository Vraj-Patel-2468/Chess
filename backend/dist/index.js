"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const Manager_1 = require("./Manager");
require("dotenv").config();
const PORT = Number(process.env.PORT) || 8080;
const Server = new ws_1.WebSocketServer({ port: PORT });
let manager = new Manager_1.Manager();
Server.on("connection", (socket) => {
    manager.addUser(socket);
    socket.on("close", () => {
        manager.removeUser(socket);
    });
});
