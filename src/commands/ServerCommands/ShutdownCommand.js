"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShutdownCommand = void 0;
const CommandBase_1 = require("../CommandBase");
class ShutdownCommand extends CommandBase_1.CommandBase {
    constructor(commandName) {
        super(commandName);
    }
    execute(msg, args) {
        if (msg.author.id != "261457418901389312") {
            msg.channel.send("You are not allowed to initialize this command.");
            return;
        }
        msg.client.destroy();
    }
}
exports.ShutdownCommand = ShutdownCommand;
//# sourceMappingURL=ShutdownCommand.js.map