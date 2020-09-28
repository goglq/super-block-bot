import { ICommand } from "../interfaces/ICommand";
import { ICommandContainer } from "../interfaces/ICommandContainer";
import { CreateLobbyCommand } from "./LobbyCommands/CreateLobbyCommand";
import { PingCommand } from "./PingCommand"
import { TeamFightCommand } from "./LobbyCommands/TeamFightCommand";
import { SetLobbyCommand } from "./ServerCommands/SetLobbyCommand";
import { SetWaitChannelCommand } from "./ServerCommands/SetWaitChannelCommand";
import { SetWelcomeChannelCommand } from "./ServerCommands/SetWelcomeChannelCommand";

export class CommandContainer implements ICommandContainer{
    private _commands : Array<ICommand> = [
        new PingCommand('ping'),
        new CreateLobbyCommand('cl'),
        new TeamFightCommand('tf'),
        new SetLobbyCommand('sl'),
        new SetWaitChannelCommand('wait'),
        new SetWelcomeChannelCommand('welcome')
    ]

    public get Commands() : Array<ICommand> {
        return this._commands;
    }
} 