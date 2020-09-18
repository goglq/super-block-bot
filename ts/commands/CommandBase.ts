import {Message} from 'discord.js';

export abstract class CommandBase {
    protected _commandName : string;
    public get CommandName() : string {
        return this._commandName;
    } 

    constructor(commandName? : string){
        this._commandName = commandName;
    }

    public abstract execute(msg : Message, args : string[]) : void;
}