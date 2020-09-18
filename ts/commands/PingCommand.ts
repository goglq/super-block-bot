import { Message } from 'discord.js';
import { CommandBase } from './CommandBase'

export class PingCommand extends CommandBase{
    constructor(commandName? : string){
        super(commandName);
    }

    public execute(msg: Message, args: string[]): void {
        msg.channel.send('pong!');
    }
}