"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLobbyCommand = void 0;
const timers_1 = require("timers");
const Bot_1 = require("../../Bot");
const NoRequiredIdException_1 = require("../../exceptions/NoRequiredIdException");
const NoRequiredParameterException_1 = require("../../exceptions/NoRequiredParameterException");
const CommandBase_1 = require("../CommandBase");
class CreateLobbyCommand extends CommandBase_1.CommandBase {
    constructor(commandName) {
        super(commandName);
        this.DefaultLobbyName = 'Lobby';
    }
    execute(msg, args) {
        if (Bot_1.Bot.Instance.LobbyCategoryId === undefined)
            throw new NoRequiredIdException_1.NoRequiredIdException();
        let parentCategory = msg.guild.channels.resolve('754408581167710358');
        let lobbyName = args.length >= 1 ? args.shift() : `${this.DefaultLobbyName} #${parentCategory.children.size}`;
        if (args.indexOf('-p') > -1) {
            args.shift();
            this.createPrivateChannelAsync(msg, lobbyName, parentCategory, args);
        }
        else {
            this.createPublicChannel(msg, lobbyName, parentCategory);
        }
    }
    async createPrivateChannelAsync(msg, lobbyName, parentCategory, args) {
        if (msg.mentions.users.size < 1)
            throw new NoRequiredParameterException_1.NoRequiredParameterException();
        let newRole = await msg.guild.roles.create({
            data: {
                name: lobbyName,
                color: 'DEFAULT',
            }
        });
        let everyOne = msg.guild.roles.everyone;
        msg.member.roles.add(newRole);
        for (const user of msg.mentions.users) {
            let member = msg.guild.member(user[1]);
            member.roles.add(newRole);
        }
        let channel = await msg.guild.channels.create(lobbyName, {
            type: 'voice',
            parent: parentCategory,
            permissionOverwrites: [
                { id: newRole, allow: ['VIEW_CHANNEL', 'CONNECT'] },
                { id: everyOne, deny: ['VIEW_CHANNEL', 'CONNECT'] }
            ]
        });
        timers_1.setTimeout(async () => this.DeleteChannelOnTimeOut(channel), 5000);
    }
    async createPublicChannel(msg, lobbyName, parentCategory) {
        let channel = await msg.guild.channels.create(lobbyName, { type: 'voice', parent: parentCategory });
        timers_1.setTimeout(async () => this.DeleteChannelOnTimeOut(channel), 5000);
    }
    async DeleteChannelOnTimeOut(channel) {
        if (channel.members.size != 0)
            return;
        let channelPermissions = channel.permissionOverwrites
            .filter(permissionOverwrite => permissionOverwrite.id != channel.guild.roles.everyone.id)
            .values();
        for (const role of channelPermissions)
            await channel.guild.roles.resolve(role.id).delete();
        await channel.delete();
    }
}
exports.CreateLobbyCommand = CreateLobbyCommand;
//# sourceMappingURL=CreateLobbyCommand.js.map