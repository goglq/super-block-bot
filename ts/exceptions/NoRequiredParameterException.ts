import { Message } from "discord.js";
import { BotException } from "./BotException";

export class NoRequiredParameterException extends BotException{
    constructor(){
        super();
        this.Message = "NO REQUIRED PARAMETER"; 
    }

    public Handle(msg: Message) {
        msg.channel
    }
}