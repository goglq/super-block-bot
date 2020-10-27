"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const discord_js_1 = require("discord.js");
class Bot {
    constructor() {
        this._waitChannelId = '754427337692545125';
        this._lobbyCategoryId = '754408581167710358';
        this._client = new discord_js_1.Client();
        const { prefix, token } = require('../botconfig.json');
        this._token = token;
        this._prefix = prefix;
        this._client.on('message', (message) => this.onMessageRecieved(message, this._prefix));
        this._client.on('voiceStateUpdate', async (oldState, newState) => await this.onVoiceStateUpdate(oldState, newState));
    }
    start() {
        this._client.login(this._token)
            .then(bot => console.log(`Successfully logged in as ${bot}`))
            .catch(console.error);
    }
    setCommands(commands) {
        this._commands = commands;
    }
    onMessageRecieved(msg, prefix) {
        console.log(prefix);
        if (!msg.content.startsWith(prefix) || msg.author.bot)
            return;
        const args = msg.content.slice(this._prefix.length).trim().split(' ');
        const commandName = args.shift().toLowerCase();
        for (const command of this._commands) {
            if (command.CommandName == commandName) {
                command.execute(msg, args);
            }
        }
    }
    async onVoiceStateUpdate(oldState, newState) {
        await this.deleteLobbyChannelsAndRoles(oldState, newState);
        await this.deleteCategoriesAndChildren(oldState, newState);
    }
    async deleteLobbyChannelsAndRoles(oldState, newState) {
        if (oldState.channel == null || oldState.channel.members.size != 0
            || oldState.channel.parentID != this._lobbyCategoryId || oldState.channelID == this._waitChannelId)
            return;
        console.log(`members in chat: ${oldState.channel.members.size}`);
        console.log(`oldState.channel exists: ${oldState.channel != null}`);
        console.log(`newState.channel exists: ${newState.channel != null}`);
        await oldState.channel.delete();
        if (oldState.channel.permissionOverwrites.size > 0) {
            let poID = oldState.channel.permissionOverwrites.filter(po => po.id != oldState.guild.roles.everyone.id).firstKey();
            console.log(poID);
            await oldState.guild.roles.resolve(poID).delete();
        }
    }
    async deleteCategoriesAndChildren(oldState, newState) {
        if (oldState.channel == null || oldState.channel.members.size != 0
            || oldState.channel.parentID == this._lobbyCategoryId || oldState.channelID == this._waitChannelId)
            return;
        let parent = oldState.channel.parent;
        for (const voiceChannel of parent.children.filter(i => typeof (i) == typeof (discord_js_1.VoiceChannel)).values()) {
            if (voiceChannel.members.size != 0)
                return;
        }
        for (const channel of parent.children) {
            await channel[1].delete();
        }
        await parent.delete();
    }
    dispose() {
        this._client.destroy();
    }
}
exports.Bot = Bot;
//# sourceMappingURL=main.js.map