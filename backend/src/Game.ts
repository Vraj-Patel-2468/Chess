import { Chess } from "chess.js";
import { WebSocket } from "ws";

export class Game {
  private P1: WebSocket;
  private P2: WebSocket;
  private chess: Chess;
  private startTime: Date;
  public moves: Array<{ from: string; to: string }>;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.P1 = player1;
    this.P2 = player2;
    this.startTime = new Date();
    this.moves = [];
    this.chess = new Chess();
    this.P1.send(JSON.stringify({ color: "White" }));
    this.P2.send(JSON.stringify({ color: "Black" }));
    this.startGame();
  }

  private makeMove(from: string, to: string) {
    const move = this.chess.move({ from, to });
    if (move) {
      this.moves.push({ from, to });
      this.P1.send(this.chess.ascii());
      this.P2.send(this.chess.ascii());
      this.P1.send(JSON.stringify({ type: "move", from, to }));
      this.P2.send(JSON.stringify({ type: "move", from, to }));
    }
    //TODO: Check all validations an see if game is getting over or not.
  }

  public startGame() {
    if(this.chess.turn() === "w") {
      this.P1.on("message", (data) => {
        const MSG = JSON.parse(data.toString());
        if(MSG.type === "move") {
          this.makeMove(MSG.from, MSG.to);
        }
      });
    } else {
      this.P2.on("message", (data) => {
        const MSG = JSON.parse(data.toString());
        if(MSG.type === "move") {
          this.makeMove(MSG.from, MSG.to);
        }
      });
    }
  }
}
