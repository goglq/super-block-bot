import { Message } from "discord.js";
import { Bot } from "../../Bot";
import { NoRequiredParameterException } from "../../exceptions/NoRequiredParameterException";
import { CommandBase } from "../CommandBase";

export class SetLobbyCommand extends CommandBase{
    constructor(command? : string){
        super(command);
    }

    public async execute(msg: Message, args: string[]): Promise<void> {
        if(msg.author.id != "261457418901389312")
        {
            msg.channel.send("You are not allowed to initialize this command.");
            return;
        }
        if(args.length < 1) throw new NoRequiredParameterException();

        Bot.Instance.LobbyCategoryId = args[0];
        msg.channel.send(`Lobby Category was set to ${args[0]}`);
    }
}