import { WebSocket, WebSocketServer } from "ws";
import { Manager } from "./Manager";
require("dotenv").config();

const PORT: number = Number(process.env.PORT) || 8080;
const Server = new WebSocketServer({ port: PORT });
let manager = new Manager();

Server.on("connection", (socket: WebSocket) => {
  manager.addUser(socket);
  socket.on("close", () => {
    manager.removeUser(socket);
  });
});
