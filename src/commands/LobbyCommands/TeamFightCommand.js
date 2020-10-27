"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamFightCommand = void 0;
const NoRequiredParameterException_1 = require("../../exceptions/NoRequiredParameterException");
const CommandBase_1 = require("../CommandBase");
class TeamFightCommand extends CommandBase_1.CommandBase {
    constructor(commandName) {
        super(commandName);
    }
    async execute(msg, args) {
        let firstTeamName = 'Pink Team';
        let secondTeamName = 'Cyan Team';
        if (args.indexOf('-t1') > -1 && args.indexOf('-t2') > -1) {
            firstTeamName = args[args.indexOf('-t1') + 1];
            secondTeamName = args[args.indexOf('-t2') + 1];
        }
        let roles = await this.CreateRoles(msg, firstTeamName, secondTeamName);
        await this.GrantRoles(msg, args, roles);
        let parentCategory = await this.CreateVoiceChannels(msg, firstTeamName, secondTeamName, roles);
        setTimeout(async () => await this.DeleteVoiceChannelsOnTimeOut(parentCategory, roles), 5000);
    }
    async CreateRoles(msg, firstTeamName, secondTeamName) {
        let firstTeamRole = await msg.guild.roles.create({
            data: {
                name: firstTeamName,
                color: 'DEFAULT',
            }
        });
        let secondTeamRole = await msg.guild.roles.create({
            data: {
                name: secondTeamName,
                color: 'DEFAULT',
            }
        });
        return [firstTeamRole, secondTeamRole];
    }
    async GrantRoles(msg, args, roles) {
        let playerMentionStarts = [args.indexOf('-p1'), args.indexOf('-p2')];
        if (playerMentionStarts[0] <= -1 || playerMentionStarts[1] <= -1)
            throw new NoRequiredParameterException_1.NoRequiredParameterException();
        this.GrantRole(msg, playerMentionStarts[0] + 1, roles[0], '-p2', args);
        this.GrantRole(msg, playerMentionStarts[1] + 1, roles[1], '-p1', args);
    }
    GrantRole(msg, startIndex, role, endFlag, args) {
        for (let i = startIndex; i < args.length && args[i] != endFlag; i++) {
            if (args[i] == '')
                continue;
            let memberId = args[i].slice(3, args[i].length - 1);
            msg.guild.members.resolve(memberId).roles.add(role);
        }
    }
    async CreateVoiceChannels(msg, firstTeamName, secondTeamName, roles) {
        let parentCategory = await msg.guild.channels.create(`${firstTeamName} vs. ${secondTeamName}`, { type: 'category' });
        let commonVoiceChannel = await msg.guild.channels.create('Common Channel', {
            type: 'voice',
            parent: parentCategory,
            permissionOverwrites: [
                { id: roles[0], allow: ['CONNECT', 'VIEW_CHANNEL'] },
                { id: roles[1], allow: ['CONNECT', 'VIEW_CHANNEL'] },
                { id: msg.guild.roles.everyone, deny: ['CONNECT', 'VIEW_CHANNEL'] }
            ]
        });
        let firstTeamVoiceChannel = await this.CreateVoiceTeamChannel(msg, firstTeamName, roles[0], parentCategory);
        let secondTeamVoiceChannel = await this.CreateVoiceTeamChannel(msg, secondTeamName, roles[1], parentCategory);
        return parentCategory;
    }
    async DeleteVoiceChannelsOnTimeOut(category, roles) {
        for (const channel of category.children.values()) {
            if (channel.members.size > 0)
                return;
        }
        for (const role of roles) {
            await role.delete();
        }
        for (const channel of category.children.values()) {
            await channel.delete();
        }
        await category.delete();
    }
    async CreateVoiceTeamChannel(msg, teamName, role, parent) {
        return await msg.guild.channels.create(teamName, {
            type: 'voice',
            parent: parent,
            permissionOverwrites: [
                { id: role, allow: ['CONNECT', 'VIEW_CHANNEL'] },
                { id: msg.guild.roles.everyone, deny: ['CONNECT', 'VIEW_CHANNEL'] }
            ]
        });
    }
}
exports.TeamFightCommand = TeamFightCommand;
//# sourceMappingURL=TeamFightCommand.js.map