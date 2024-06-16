import { WebSocket } from "ws";
import { v4 as uuid } from "uuid";

export default class User {
  public socket: WebSocket;
  public userID: string;
  public username: string;
  constructor(socket: WebSocket, username: string) {
    this.userID = uuid();
    this.username = username;
    this.socket = socket;
  }
} 
