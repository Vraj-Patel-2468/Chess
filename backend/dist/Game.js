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
        this.P1.send(JSON.stringify({ color: "White" }));
        this.P2.send(JSON.stringify({ color: "Black" }));
        this.startGame();
    }
    makeMove(from, to) {
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
    startGame() {
        if (this.chess.turn() === "w") {
            this.P1.on("message", (data) => {
                const MSG = JSON.parse(data.toString());
                if (MSG.type === "move") {
                    this.makeMove(MSG.from, MSG.to);
                }
            });
        }
        else {
            this.P2.on("message", (data) => {
                const MSG = JSON.parse(data.toString());
                if (MSG.type === "move") {
                    this.makeMove(MSG.from, MSG.to);
                }
            });
        }
    }
}
exports.Game = Game;
