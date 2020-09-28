import { Collection, Message } from "discord.js";
import { NoRequiredParameterException } from "../../exceptions/NoRequiredParameterException";
import { CommandBase } from "../CommandBase";

export class ClearChatCommand extends CommandBase{
    constructor(commmandName? : string){
        super(commmandName);
    }

    public execute(msg: Message, args: string[]): void {
        if(args.length < 1) throw new NoRequiredParameterException();
        let count : number = Number.parseInt(args[0]);
        this.clear(msg, count);
    }

    private async clear(msg: Message, count : number) : Promise<void>{
        let messages : Collection<string, Message> = await msg.channel.messages.fetch({limit: count});
        for(const message of messages.values()){
            await message.delete();
        }
    }
}