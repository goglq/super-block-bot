"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetLobbyCommand = void 0;
const Bot_1 = require("../../Bot");
const NoRequiredParameterException_1 = require("../../exceptions/NoRequiredParameterException");
const CommandBase_1 = require("../CommandBase");
class SetLobbyCommand extends CommandBase_1.CommandBase {
    constructor(command) {
        super(command);
    }
    async execute(msg, args) {
        if (msg.author.id != "261457418901389312") {
            msg.channel.send("You are not allowed to initialize this command.");
            return;
        }
        if (args.length < 1)
            throw new NoRequiredParameterException_1.NoRequiredParameterException();
        Bot_1.Bot.Instance.LobbyCategoryId = args[0];
        msg.channel.send(`Lobby Category was set to ${args[0]}`);
    }
}
exports.SetLobbyCommand = SetLobbyCommand;
//# sourceMappingURL=SetLobbyCommand.js.map