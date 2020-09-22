import { Message } from "discord.js";
import { Bot } from "../../Bot";
import { CommandBase } from "../CommandBase";

export class SetLobbyCommand extends CommandBase{
    public async execute(msg: Message, args: string[]): Promise<void> {
        if(args.length < 1) return;

        Bot.Instance.LobbyCategoryId = args[0];
        msg.channel.send("Channel");
    }
}