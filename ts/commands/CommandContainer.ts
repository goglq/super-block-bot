import { ICommand } from "../interfaces/ICommand";
import { ICommandContainer } from "../interfaces/ICommandContainer";
import { CreateLobbyCommand } from "./LobbyCommands/CreateLobbyCommand";
import { ShutdownCommand } from "./ServerCommands/ShutdownCommand"
import { TeamFightCommand } from "./LobbyCommands/TeamFightCommand";
import { SetLobbyCommand } from "./ServerCommands/SetLobbyCommand";
import { SetWaitChannelCommand } from "./ServerCommands/SetWaitChannelCommand";
import { SetWelcomeChannelCommand } from "./ServerCommands/SetWelcomeChannelCommand";
import { ClearChatCommand } from "./ServerCommands/ClearChatCommand";

export class CommandContainer {//implements ICommandContainer{
    private _commands : Array<ICommand> = [
        new ClearChatCommand('clear'),
        new ShutdownCommand('shutdown'),
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