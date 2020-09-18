import { CommandContainer } from './commands/CommandContainer';
import { Bot } from './main';

var bot : Bot = new Bot();
var commandContainer : CommandContainer = new CommandContainer();
bot.setCommands(commandContainer.Commands);
bot.start();