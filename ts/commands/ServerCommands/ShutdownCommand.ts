import { Message } from 'discord.js';
import { basename } from 'path';
import { CommandBase } from '../CommandBase';

export class ShutdownCommand extends CommandBase{
    constructor(commandName? : string){
        super(commandName);
    }

    public execute(msg: Message, args: string[]): void {
        if(msg.author.id != "261457418901389312")
        {
            msg.channel.send("You are not allowed to initialize this command.");
            return;
        }
        msg.client.destroy();
    }
}