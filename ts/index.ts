import { CommandContainer } from './commands/CommandContainer';
import { Bot } from './Bot';

class DiscordSuperBot{
    public start(){
        var commandContainer : CommandContainer = new CommandContainer();
        Bot.Instance.setCommands(commandContainer.Commands);
        Bot.Instance.start();
    }
}

var dsBot : DiscordSuperBot = new DiscordSuperBot();
dsBot.start();