"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageTypes = void 0;
var MessageTypes;
(function (MessageTypes) {
    MessageTypes["Move"] = "move";
    MessageTypes["Game"] = "game";
    MessageTypes["Start"] = "start";
    MessageTypes["End"] = "end";
    MessageTypes["Error"] = "error";
})(MessageTypes || (exports.MessageTypes = MessageTypes = {}));
