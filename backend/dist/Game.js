"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
class Game {
    constructor(player1, player2) {
        this.P1 = player1;
        this.P2 = player2;
        this.startTime = new Date();
        this.moves = [];
        this.chess = new chess_js_1.Chess();
        this.P1.socket.send(JSON.stringify({ userID: this.P1.userID, color: "White" }));
        this.P2.socket.send(JSON.stringify({ userID: this.P2.userID, color: "Black" }));
        this.startGame();
    }
    getBoard() {
        return this.chess.board();
    }
    makeMove(from, to) {
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
    startGame() {
        if (this.chess.turn() === "w") {
            this.P1.socket.on("message", (data) => {
                const MSG = JSON.parse(data.toString());
                if (MSG.type === "move") {
                    this.makeMove(MSG.from, MSG.to);
                }
            });
        }
        else {
            this.P2.socket.on("message", (data) => {
                const MSG = JSON.parse(data.toString());
                if (MSG.type === "move") {
                    this.makeMove(MSG.from, MSG.to);
                }
            });
        }
    }
}
exports.Game = Game;
