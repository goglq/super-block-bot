"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClearChatCommand = void 0;
const NoRequiredParameterException_1 = require("../../exceptions/NoRequiredParameterException");
const CommandBase_1 = require("../CommandBase");
class ClearChatCommand extends CommandBase_1.CommandBase {
    constructor(commmandName) {
        super(commmandName);
    }
    execute(msg, args) {
        if (args.length < 1)
            throw new NoRequiredParameterException_1.NoRequiredParameterException();
        let count = Number.parseInt(args[0]);
        this.clear(msg, count);
    }
    async clear(msg, count) {
        let messages = await msg.channel.messages.fetch({ limit: count });
        for (const message of messages.values()) {
            await message.delete();
        }
    }
}
exports.ClearChatCommand = ClearChatCommand;
//# sourceMappingURL=ClearChatCommand.js.map