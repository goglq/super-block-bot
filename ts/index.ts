import { CommandContainer } from './commands/CommandContainer';
import { Bot } from './Bot';

var commandContainer : CommandContainer = new CommandContainer();
Bot.Instance.setCommands(commandContainer.Commands);
Bot.Instance.start();