import {Message} from 'discord.js';
import { ICommand } from '../interfaces/ICommand';


export abstract class CommandBase implements ICommand {
    protected _commandName : string;

    public get CommandName() : string {
        return this._commandName;
    } 
    
    constructor(commandName? : string){
        this._commandName = commandName;
    }
    public abstract execute(msg : Message, args : string[]) : void;
}