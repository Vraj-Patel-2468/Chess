"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const Manager_1 = require("./Manager");
const Message_1 = require("./Message");
require("dotenv").config();
const PORT = Number(process.env.PORT) || 8080;
const Server = new ws_1.WebSocketServer({ port: PORT });
let manager = new Manager_1.Manager();
Server.on("connection", (socket) => {
    socket.on("message", (data) => {
        const MSG = JSON.parse(data.toString());
        if (MSG.type === Message_1.MessageTypes.New) {
            manager.addUser(socket, MSG.username);
        }
        if (MSG.type === Message_1.MessageTypes.Cancel) {
            manager.makePendingUserNull(MSG.userID);
        }
        if (MSG.type === Message_1.MessageTypes.Start) {
            const player = manager.findUserUsingID(MSG.userID);
            manager.gameStarter(player);
        }
    });
    socket.on("close", () => {
        manager.removeUser(socket);
    });
});
