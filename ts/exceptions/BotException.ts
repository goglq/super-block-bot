import { Message } from "discord.js";

export abstract class BotException{
    private _message : string;
    private _name : string;
    private _stack : string;

    public get Message() : string{
        return this._message;
    }

    public set Message(value :string){
        this._message = value
    }

    public get Name() : string{
        return this._name;
    }

    public set Name(value :string){
        this._name = value;
    }

    public get Stack() : string{
        return this._stack;
    }

    public set Stack(value : string){
        this._stack = value;
    }

    constructor(){
        this.Stack = new Error().stack;
    }

    public Handle(msg: Message){
        msg.channel.send(this.Message);
    }
}