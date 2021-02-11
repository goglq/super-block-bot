"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandContainer = void 0;
const CreateLobbyCommand_1 = require("./LobbyCommands/CreateLobbyCommand");
const ShutdownCommand_1 = require("./ServerCommands/ShutdownCommand");
const TeamFightCommand_1 = require("./LobbyCommands/TeamFightCommand");
const SetLobbyCommand_1 = require("./ServerCommands/SetLobbyCommand");
const SetWaitChannelCommand_1 = require("./ServerCommands/SetWaitChannelCommand");
const SetWelcomeChannelCommand_1 = require("./ServerCommands/SetWelcomeChannelCommand");
const ClearChatCommand_1 = require("./ServerCommands/ClearChatCommand");
class CommandContainer {
    constructor() {
        this._commands = [
            new ClearChatCommand_1.ClearChatCommand('clear'),
            new ShutdownCommand_1.ShutdownCommand('shutdown'),
            new CreateLobbyCommand_1.CreateLobbyCommand('cl'),
            new TeamFightCommand_1.TeamFightCommand('tf'),
            new SetLobbyCommand_1.SetLobbyCommand('sl'),
            new SetWaitChannelCommand_1.SetWaitChannelCommand('wait'),
            new SetWelcomeChannelCommand_1.SetWelcomeChannelCommand('welcome')
        ];
    }
    get Commands() {
        return this._commands;
    }
}
exports.CommandContainer = CommandContainer;
//# sourceMappingURL=CommandContainer.js.map