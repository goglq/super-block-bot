import { Guild, Message } from "discord.js";
import { Bot } from "../../Bot";
import { NoRequiredParameterException } from "../../exceptions/NoRequiredParameterException";
import { CommandBase } from "../CommandBase";

export class SetWelcomeChannelCommand extends CommandBase{
    constructor(commandName? : string){
        super(commandName);
    }

    public execute(msg: Message, args: string[]): void {
        if(args.length < 1) throw new NoRequiredParameterException();

        Bot.Instance.WelcomeChannelId = args[0];
        msg.channel.send(`Welcome channel was set to ${args[0]}`);
    }
}