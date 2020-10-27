"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetWaitChannelCommand = void 0;
const Bot_1 = require("../../Bot");
const NoRequiredParameterException_1 = require("../../exceptions/NoRequiredParameterException");
const CommandBase_1 = require("../CommandBase");
class SetWaitChannelCommand extends CommandBase_1.CommandBase {
    constructor(commandName) {
        super(commandName);
    }
    execute(msg, args) {
        if (args.length < 1)
            throw new NoRequiredParameterException_1.NoRequiredParameterException();
        Bot_1.Bot.Instance.WaitChannelId = args[0];
        msg.channel.send(`Wait Channel was set to ${args[0]}`);
    }
}
exports.SetWaitChannelCommand = SetWaitChannelCommand;
//# sourceMappingURL=SetWaitChannelCommand.js.map