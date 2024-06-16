"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class User {
    constructor(socket, username) {
        this.userID = (0, uuid_1.v4)();
        this.username = username;
        this.socket = socket;
    }
}
exports.default = User;
