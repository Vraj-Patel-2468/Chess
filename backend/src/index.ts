import { WebSocket, WebSocketServer } from "ws";
import { Manager } from "./Manager";
import { MessageTypes } from "./Message";
require("dotenv").config();

const PORT: number = Number(process.env.PORT) || 8080;
const Server = new WebSocketServer({ port: PORT });
let manager = new Manager();

Server.on("connection", (socket: WebSocket) => {
  socket.on("message", (data) => {
    const MSG = JSON.parse(data.toString());
    if (MSG.type === MessageTypes.New) {
      manager.addUser(socket, MSG.username);  
    }
    if(MSG.type === MessageTypes.Cancel) {
      manager.makePendingUserNull(MSG.userID);
    } 
    if(MSG.type === MessageTypes.Start) {
      const player = manager.findUserUsingID(MSG.userID);
      manager.gameStarter(player);
    }
  })
  socket.on("close", () => {
    manager.removeUser(socket);
  });
});
