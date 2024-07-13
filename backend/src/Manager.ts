import { WebSocket } from "ws";
import { Game } from "./Game";
import { MessageTypes } from "./Message";
import User from "./User";

export class Manager {
  private Games: Array<Game>;
  private Users: Array<User>;
  private pendingUser: User | null = null;

  constructor() {
    this.Games = [];
    this.Users = [];
  }

  public findUserUsingID(ID: string) {
    return this.Users.filter((x) => x.userID === ID)[0];
  }

  public addUser(user: WebSocket, username: string) {
    const x = new User(user, username);
    user.send(JSON.stringify({ msg: "success", userID: x.userID }));
    this.Users.push(x);    
  }

  public makePendingUserNull(userID: string) {
    this.pendingUser = null;
    const x: User = this.findUserUsingID(userID);
    x.socket.send(JSON.stringify(
      {
        msg: "cancel",
        status: "done"
      }
    ));
  }

  public removeUser(user: WebSocket) {
    this.Users.filter((x) => user !== x.socket);
  }

  public gameStarter(x: User) {
    if(this.pendingUser) {
      const game = new Game(this.pendingUser, x);
      this.Games.push(game);
      const board = game.getBoard();
      this.pendingUser.socket.send(JSON.stringify({
        msg: MessageTypes.Start,
        payload: {
          pending: false,
          P1: this.pendingUser.username,
          P2: x.username,
          board: board,
          color: "white"
        }
      })),
      x.socket.send(JSON.stringify({
        msg: MessageTypes.Start,
        payload: {
          pending: false,
          P1: this.pendingUser.username,
          P2: x.username,
          board: board,
          color: "black"
        }
      }));
      this.pendingUser = null;
      game.startGame();
    }
    else {
      this.pendingUser = x;
      this.pendingUser.socket.send(JSON.stringify({
        msg: MessageTypes.Start,
        payload: {
          pending: true
        }
      }));
    }      
  }  

};
