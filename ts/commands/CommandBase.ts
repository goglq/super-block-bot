import {Message} from 'discord.js';

export class CommandBase {
    private _commandName : string;
    public get CommandName() : string {
        return this._commandName;
    } 

    constructor(){

    }

    public execute(msg : Message, args : string[]) : void{
        
    }
}