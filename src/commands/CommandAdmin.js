"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandAdmin = void 0;
class CommandAdmin {
    constructor(commandName) {
        this._commandName = commandName;
    }
    get CommandName() {
        return this._commandName;
    }
    execute(msg, args) {
        if (msg.author.id != "261457418901389312") {
            msg.channel.send("You are not allowed to initialize this command.");
            return;
        }
    }
}
exports.CommandAdmin = CommandAdmin;
//# sourceMappingURL=CommandAdmin.js.map