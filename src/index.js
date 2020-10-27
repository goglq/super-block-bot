"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandContainer_1 = require("./commands/CommandContainer");
const Bot_1 = require("./Bot");
class DiscordSuperBot {
    start() {
        var commandContainer = new CommandContainer_1.CommandContainer();
        Bot_1.Bot.Instance.setCommands(commandContainer.Commands);
        Bot_1.Bot.Instance.start();
    }
}
var dsBot = new DiscordSuperBot();
dsBot.start();
//# sourceMappingURL=index.js.map