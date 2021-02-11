import { CommandContainer } from './commands/CommandContainer';
import { Bot } from './Bot';
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

var commandContainer : CommandContainer = new CommandContainer();
Bot.Instance.setCommands(commandContainer.Commands);
Bot.Instance.start();

// var dsBot : DiscordSuperBot = new DiscordSuperBot();
// dsBot.start();