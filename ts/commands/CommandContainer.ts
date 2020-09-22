import { ICommand } from "../interfaces/ICommand";
import { ICommandContainer } from "../interfaces/ICommandContainer";
import { CreateLobbyCommand } from "./CreateLobbyCommand";
import { PingCommand } from "./PingCommand"
import { TeamFightCommand } from "./TeamFightCommand";

export class CommandContainer implements ICommandContainer{
    private _commands : Array<ICommand> = [
        new PingCommand('ping'),
        new CreateLobbyCommand('cl'),
        new TeamFightCommand('tf')
    ]

    public get Commands() : Array<ICommand> {
        return this._commands;
    }
} 