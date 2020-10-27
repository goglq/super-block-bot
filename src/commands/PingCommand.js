"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingCommand = void 0;
const CommandBase_1 = require("./CommandBase");
class PingCommand extends CommandBase_1.CommandBase {
    constructor(commandName) {
        super(commandName);
    }
    execute(msg, args) {
        msg.client.destroy();
    }
}
exports.PingCommand = PingCommand;
//# sourceMappingURL=PingCommand.js.map