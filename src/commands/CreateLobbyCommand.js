"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLobbyCommand = void 0;
const timers_1 = require("timers");
const CommandBase_1 = require("./CommandBase");
class CreateLobbyCommand extends CommandBase_1.CommandBase {
    constructor(commandName) {
        super(commandName);
        this.DefaultLobbyName = 'Lobby';
    }
    execute(msg, args) {
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
        msg.guild.channels.create(lobbyName, {
            type: 'voice',
            parent: parentCategory,
            permissionOverwrites: [
                { id: newRole, allow: ['VIEW_CHANNEL', 'CONNECT'] },
                { id: everyOne, deny: ['VIEW_CHANNEL', 'CONNECT'] }
            ]
        }).then(channel => {
            console.log(channel.permissionOverwrites);
            timers_1.setTimeout(async () => {
                if (channel.members.size == 0) {
                    await channel.delete();
                    await newRole.delete();
                }
            }, 5000);
        }).catch(console.error);
    }
    createPublicChannel(msg, lobbyName, parentCategory) {
        msg.guild.channels.create(lobbyName, { type: 'voice', parent: parentCategory })
            .then(channel => {
            console.log(channel);
            timers_1.setTimeout(async () => {
                if (channel.members.size == 0)
                    await channel.delete();
            }, 5000);
        })
            .catch(console.error);
    }
}
exports.CreateLobbyCommand = CreateLobbyCommand;
//# sourceMappingURL=CreateLobbyCommand.js.map