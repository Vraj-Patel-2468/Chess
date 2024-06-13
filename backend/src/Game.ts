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
  }
}
