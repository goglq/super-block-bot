import { CommandBase } from "./CommandBase"
import { CreateLobbyCommand } from "./CreateLobbyCommand";
import { PingCommand } from "./PingCommand"

export class CommandContainer{
    private _commands : Array<CommandBase> = [
        new PingCommand('ping'),
        new CreateLobbyCommand('cl'),
    ]

    public get Commands() : Array<CommandBase> {
        return this._commands;
    }
} 