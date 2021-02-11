"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const discord_js_1 = require("discord.js");
const BotException_1 = require("./exceptions/BotException");
const dotenv = require("dotenv");
class Bot {
    constructor() {
        this._baseRoles = ['754494905199493150'];
        this._waitChannelId = '754427337692545125';
        this._lobbyCategoryId = '754408581167710358';
        this._welcomeChannelId = '752942323243155597';
        dotenv.config({ path: __dirname + '/../.env' });
        this._client = new discord_js_1.Client();
        this._prefix = '!';
        this._token = process.env.TOKEN;
        this._client.on('message', (message) => this.onMessageRecieved(message, this._prefix));
        this._client.on('voiceStateUpdate', async (oldState, newState) => await this.onVoiceStateUpdate(oldState, newState));
        this._client.on('guildMemberAdd', async (member) => await this.onGuildMemberAdd(member));
    }
    get BaseRoles() {
        return this._baseRoles;
    }
    get LobbyCategoryId() {
        return this._lobbyCategoryId;
    }
    set LobbyCategoryId(value) {
        this._lobbyCategoryId = value;
    }
    get WaitChannelId() {
        return this._waitChannelId;
    }
    set WaitChannelId(value) {
        this._waitChannelId = value;
    }
    get WelcomeChannelId() {
        return this._welcomeChannelId;
    }
    set WelcomeChannelId(value) {
        this._welcomeChannelId = value;
    }
    static get Instance() {
        if (this._instance === undefined)
            this._instance = new Bot();
        return this._instance;
    }
    start() {
        this._client.login('NzU1MzU1NTU3MTA3NDY2MzAw.X2CFrg.IJf7kBEF4-1YITe_19dQBcBGKCE')
            .then(bot => console.log(`Successfully logged in as ${bot}`))
            .catch(console.error);
    }
    setCommands(commands) {
        this._commands = commands;
    }
    async onMessageRecieved(msg, prefix) {
        try {
            if (!msg.content.startsWith(prefix) || msg.author.bot)
                return;
            const args = msg.content.slice(this._prefix.length).trim().split(' ');
            const commandName = args.shift().toLowerCase();
            for (const command of this._commands) {
                if (command.CommandName == commandName) {
                    command.execute(msg, args);
                    break;
                }
            }
            //await msg.delete();
        }
        catch (error) {
            if (error instanceof BotException_1.BotException) {
                error.Handle(msg);
            }
            console.log(error);
        }
    }
    async onGuildMemberAdd(member) {
        if (this._welcomeChannelId === undefined)
            return;
        let guild = member.guild;
        this.sayHello(guild, member);
        this.grantBasicRole(guild, member);
    }
    grantBasicRole(guild, member) {
        if (this._baseRoles.length < 1)
            return;
        for (const roleId of this._baseRoles) {
            let playerRole = guild.roles.resolve(roleId);
            member.roles.add(playerRole);
        }
    }
    sayHello(guild, member) {
        let welcomeChannel = guild.channels.resolve(this._welcomeChannelId);
        welcomeChannel.send(`Даров, <@${member.id}>!`);
    }
    async onVoiceStateUpdate(oldState, newState) {
        await this.deleteLobbyChannelsAndRoles(oldState, newState);
        await this.deleteCategoriesAndChildren(oldState, newState);
    }
    async deleteLobbyChannelsAndRoles(oldState, newState) {
        if (this._lobbyCategoryId === undefined)
            return;
        if ((oldState.channel == null || oldState.channel.members.size > 0)
            || (oldState.channel.parentID != this._lobbyCategoryId || oldState.channelID != this._waitChannelId))
            return;
        if (oldState.channel.permissionOverwrites.size > 0) {
            let poID = oldState.channel.permissionOverwrites.filter(po => po.id != oldState.guild.roles.everyone.id).firstKey();
            console.log(poID);
            await oldState.guild.roles.resolve(poID).delete();
        }
        await oldState.channel.delete();
    }
    async deleteCategoriesAndChildren(oldState, newState) {
        if (oldState.channel == null && oldState.channel.parentID == this._lobbyCategoryId
            && oldState.channelID == this._waitChannelId)
            return;
        let parent = oldState.channel.parent;
        for (const voiceChannel of parent.children.filter(i => typeof (i) == typeof (discord_js_1.VoiceChannel)).values()) {
            if (voiceChannel.members.size > 0)
                return;
        }
        for (const channel of parent.children) {
            await channel[1].delete();
            let poID = channel[1].permissionOverwrites.firstKey();
            await oldState.guild.roles.resolve(poID).delete();
        }
        await parent.delete();
    }
    dispose() {
        this._client.destroy();
    }
}
exports.Bot = Bot;
//# sourceMappingURL=Bot.js.map