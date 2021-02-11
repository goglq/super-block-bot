"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandContainer_1 = require("./commands/CommandContainer");
const Bot_1 = require("./Bot");
//import { IDisposable } from './interfaces/IDisposable';
// function using<T extends IDisposable>(resource: T, func: (res: T) => void)
// {
//     try{
//         func(resource);
//     }
//     finally{
//         resource.dispose();
//     }
// }
// class DiscordSuperBot implements IDisposable{
//     public start(){
//         var commandContainer : CommandContainer = new CommandContainer();
//         Bot.Instance.setCommands(commandContainer.Commands);
//         Bot.Instance.start();
//     }
//     dispose() {
//         Bot.Instance.stop();
//     }
// }
var commandContainer = new CommandContainer_1.CommandContainer();
Bot_1.Bot.Instance.setCommands(commandContainer.Commands);
Bot_1.Bot.Instance.start();
// var dsBot : DiscordSuperBot = new DiscordSuperBot();
// dsBot.start();
//# sourceMappingURL=index.js.map