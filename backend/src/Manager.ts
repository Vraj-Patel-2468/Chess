import { WebSocket } from "ws";
import { Game } from "./Game";
import { MessageTypes } from "./Message";

export class Manager {
  private Games: Array<Game>;
  private Users: Array<WebSocket>;
  private pendingUser: WebSocket | null = null;

  constructor() {
    this.Games = [];
    this.Users = [];
  }

  public addUser(user: WebSocket) {
    this.Users.push(user);
    this.addHandler(user);
  }

  public removeUser(user: WebSocket) {
    this.Users.filter((x) => user !== x);
  }

  private addHandler(user:WebSocket) {
    user.on("message", (data) => {
      const MSG = JSON.parse(data.toString());
      if(MSG.type === MessageTypes.Start) {
        if(this.pendingUser) {
          const game = new Game(this.pendingUser, user);
          this.Games.push(game);
          this.pendingUser = null;
        }
        else {
          this.pendingUser = user;
          user.send(JSON.stringify({ msg: "Waiting for opponent ..." }));
        }
      }
    });
  }  
};
