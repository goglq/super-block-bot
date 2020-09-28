import { Message } from "discord.js";
import { BotException } from "./BotException";

export class NoRequiredIdException extends BotException{

    constructor() {
        super();
        this.Message = 'NO REQUIRED ID OF CATEGORY OR CHANNEL';
    }

    public Handle(msg: Message) {
        super.Handle(msg);
    }
}