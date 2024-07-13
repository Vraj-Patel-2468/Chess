import { Chess } from "chess.js";
import { WebSocket } from "ws";
import User from "./User";

export class Game {
  public P1: User;
  public P2: User;
  private chess: Chess;
  private startTime: Date;
  public moves: Array<{ from: string; to: string }>;

  constructor(player1: User, player2: User) {
    this.P1 = player1;
    this.P2 = player2;
    this.startTime = new Date();
    this.moves = [];
    this.chess = new Chess();
    this.startGame();
  }

  public getBoard() {
    let boardState: any = this.chess.board();
    const squares = [
      "a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8",
      "a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7",
      "a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6",
      "a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5",
      "a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4",
      "a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3",
      "a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2",
      "a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"
    ];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        boardState[i][j] = boardState[i][j] == null ? { square: squares[i * 8 + j], type: null, color: null } : boardState[i][j];
      }
    }
    return boardState;
  }

  public makeMove(from: string, to: string, promotion: string = "") {
    let move;
    try {
      move = this.chess.move({ from, to, promotion });
    } catch(e) {
      this.P1.socket.send(JSON.stringify({ type: "error", error: "Invalid move" }));
      this.P2.socket.send(JSON.stringify({ type: "error", error: "Invalid move" }));
      return;
    }
    if (move) {
      this.moves.push({ from, to });
      const board = this.getBoard();
      const msgPayload = {
        P1: this.P1.username,
        P2: this.P2.username,
        board,
        moveDetails: move
      }
      this.P1.socket.send(JSON.stringify({ msg: "move", payload: {...msgPayload, color: "white"} }));
      this.P2.socket.send(JSON.stringify({ msg: "move", payload: {...msgPayload, color: "black"} }));
      if (this.chess.isGameOver()) {
        const winner = this.chess.turn() === "w" ? this.P1 : this.P2;
        this.P1.socket.send(JSON.stringify({ type: "gameover", winner: winner.username }));
        this.P2.socket.send(JSON.stringify({ type: "gameover", winner: winner.username }));
      }
    } else {
      this.P1.socket.send(JSON.stringify({ type: "error", error: "Invalid move" }));
      this.P2.socket.send(JSON.stringify({ type: "error", error: "Invalid move" }));
    }
  }
  
  public startGame() {
    this.P1.socket.on("message", (data) => {
      const MSG = JSON.parse(data.toString());
      if (MSG.type === "move") {
        const { from, to, promotion } = MSG;
        this.makeMove(from, to, promotion);
      }
    });
    this.P2.socket.on("message", (data) => {
      const MSG = JSON.parse(data.toString());
      if (MSG.type === "move") {
        const { from, to, promotion } = MSG;
        this.makeMove(from, to, promotion);
      }
    });
  }
}
