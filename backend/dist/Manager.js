"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = void 0;
const Game_1 = require("./Game");
const Message_1 = require("./Message");
const User_1 = __importDefault(require("./User"));
class Manager {
    constructor() {
        this.pendingUser = null;
        this.Games = [];
        this.Users = [];
    }
    findUserUsingID(ID) {
        return this.Users.filter((x) => x.userID === ID)[0];
    }
    addUser(user, username) {
        const x = new User_1.default(user, username);
        user.send(JSON.stringify({ msg: "success", userID: x.userID }));
        this.Users.push(x);
    }
    makePendingUserNull(userID) {
        this.pendingUser = null;
        const x = this.findUserUsingID(userID);
        x.socket.send(JSON.stringify({
            msg: "cancel",
            status: "done"
        }));
    }
    removeUser(user) {
        this.Users.filter((x) => user !== x.socket);
    }
    gameStarter(x) {
        if (this.pendingUser) {
            const game = new Game_1.Game(this.pendingUser, x);
            this.Games.push(game);
            const board = game.getBoard();
            this.pendingUser.socket.send(JSON.stringify({
                msg: Message_1.MessageTypes.Start,
                payload: {
                    pending: false,
                    P1: this.pendingUser.username,
                    P2: x.username,
                    board: board,
                    color: "white"
                }
            })),
                x.socket.send(JSON.stringify({
                    msg: Message_1.MessageTypes.Start,
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
                msg: Message_1.MessageTypes.Start,
                payload: {
                    pending: true
                }
            }));
        }
    }
}
exports.Manager = Manager;
;
