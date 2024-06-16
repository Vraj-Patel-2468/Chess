import { Chess } from "chess.js";
import { WebSocket } from "ws";
import User from "./User";

export class Game {
  private P1: User;
  private P2: User;
  private chess: Chess;
  private startTime: Date;
  public moves: Array<{ from: string; to: string }>;

  constructor(player1: User, player2: User) {
    this.P1 = player1;
    this.P2 = player2;
    this.startTime = new Date();
    this.moves = [];
    this.chess = new Chess();
    this.P1.socket.send(JSON.stringify({ userID: this.P1.userID, color: "White" }));
    this.P2.socket.send(JSON.stringify({ userID: this.P2.userID, color: "Black" }));
    this.startGame();
  }

  public getBoard() {
    return this.chess.board();
  }

  private makeMove(from: string, to: string) {
    const move = this.chess.move({ from, to });
    if (move) {
      this.moves.push({ from, to });
      this.P1.socket.send(this.chess.ascii());
      this.P2.socket.send(this.chess.ascii());
      this.P1.socket.send(JSON.stringify({ type: "move", from, to }));
      this.P2.socket.send(JSON.stringify({ type: "move", from, to }));
    }
    //TODO: Check all validations an see if game is getting over or not.
  }

  public startGame() {
    if(this.chess.turn() === "w") {
      this.P1.socket.on("message", (data) => {
        const MSG = JSON.parse(data.toString());
        if(MSG.type === "move") {
          this.makeMove(MSG.from, MSG.to);
        }
      });
    } else {
      this.P2.socket.on("message", (data) => {
        const MSG = JSON.parse(data.toString());
        if(MSG.type === "move") {
          this.makeMove(MSG.from, MSG.to);
        }
      });
    }
  }
}
