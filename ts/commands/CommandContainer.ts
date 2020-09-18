import { CommandBase } from "./CommandBase"
import { CreateLobbyCommand } from "./CreateLobbyCommand";
import { PingCommand } from "./PingCommand"
import { TeamFightCommand } from "./TeamFightCommand";

export class CommandContainer{
    private _commands : Array<CommandBase> = [
        new PingCommand('ping'),
        new CreateLobbyCommand('cl'),
        new TeamFightCommand('tf')
    ]

    public get Commands() : Array<CommandBase> {
        return this._commands;
    }
} 