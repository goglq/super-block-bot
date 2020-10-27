"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotException = void 0;
class BotException {
    constructor() {
        this.Stack = new Error().stack;
    }
    get Message() {
        return this._message;
    }
    set Message(value) {
        this._message = value;
    }
    get Name() {
        return this._name;
    }
    set Name(value) {
        this._name = value;
    }
    get Stack() {
        return this._stack;
    }
    set Stack(value) {
        this._stack = value;
    }
    Handle(msg) {
        msg.channel.send(this.Message);
    }
}
exports.BotException = BotException;
//# sourceMappingURL=BotException.js.map