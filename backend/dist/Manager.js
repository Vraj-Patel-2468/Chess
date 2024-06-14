"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = void 0;
const Game_1 = require("./Game");
const Message_1 = require("./Message");
class Manager {
    constructor() {
        this.pendingUser = null;
        this.Games = [];
        this.Users = [];
    }
    addUser(user) {
        this.Users.push(user);
        this.addHandler(user);
    }
    removeUser(user) {
        this.Users.filter((x) => user !== x);
    }
    addHandler(user) {
        user.on("message", (data) => {
            const MSG = JSON.parse(data.toString());
            if (MSG.type === Message_1.MessageTypes.Start) {
                if (this.pendingUser) {
                    const game = new Game_1.Game(this.pendingUser, user);
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
}
exports.Manager = Manager;
;
