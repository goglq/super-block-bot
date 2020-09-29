import { CategoryChannel, Client, Guild, GuildMember, Message, TextChannel, VoiceChannel, VoiceState, Role } from 'discord.js';
import { BotException } from './exceptions/BotException';
import { ICommand } from './interfaces/ICommand';

interface IDisposable{
    dispose(): void;
}

export class Bot implements IDisposable{
    private static _instance : Bot;

    private _client : Client;
    private _prefix : string;
    private _token : string;
    private _commands : Array<ICommand>;

    private readonly _baseRoles : Array<string> = ['754494905199493150'];

    private _waitChannelId : string = '754427337692545125';
    private _lobbyCategoryId : string = '754408581167710358';
    private _welcomeChannelId : string = '752942323243155597';

    public get BaseRoles() :Array<string>{
        return this._baseRoles;
    }

    public get LobbyCategoryId() : string{
        return this._lobbyCategoryId;
    }
    public set LobbyCategoryId(value:string) {
        this._lobbyCategoryId = value;
    }

    public get WaitChannelId() : string{
        return this._waitChannelId;
    }

    public set WaitChannelId(value:string){
        this._waitChannelId = value;
    }

    public get WelcomeChannelId() : string{
        return this._welcomeChannelId;
    }

    public set WelcomeChannelId(value:string){
        this._welcomeChannelId = value;
    }

    public static get Instance() : Bot{
        if(this._instance === undefined) this._instance = new Bot();
        return this._instance;
    }

    private constructor(){
        this._client = new Client();
        const {prefix, token} = require('../botconfig.json');
        this._token = token;
        this._prefix = prefix;
        this._client.on('message', (message : Message) => this.onMessageRecieved(message, this._prefix));
        this._client.on('voiceStateUpdate', async (oldState, newState) => await this.onVoiceStateUpdate(oldState, newState));
        this._client.on('guildMemberAdd', async (member : GuildMember) => await this.onGuildMemberAdd(member));
    }

    public start() : void{
        this._client.login(this._token)
            .then(bot => console.log(`Successfully logged in as ${bot}`))
            .catch(console.error);
    }

    public setCommands(commands : Array<ICommand>){
        this._commands = commands;
    }

    private onMessageRecieved(msg : Message, prefix : string) : void{

        try
        {
            if(!msg.content.startsWith(prefix) || msg.author.bot) return;

            const args : string[] = msg.content.slice(this._prefix.length).trim().split(' ');
            const commandName : string = args.shift().toLowerCase();

            for(const command of this._commands){
                if(command.CommandName == commandName){
                    command.execute(msg, args);
                }
            }
        }
        catch(error)
        {
            if(error instanceof BotException){
                error.Handle(msg);
            }
        }
    }

    private async onGuildMemberAdd(member : GuildMember) : Promise<void>{
        if(this._welcomeChannelId === undefined) return;
        let guild: Guild = member.guild;
        this.sayHello(guild,member);
        this.grantBasicRole(guild, member);
    }

    private grantBasicRole(guild: Guild, member: GuildMember) {
        if(this._baseRoles.length < 1) return;
        for(const roleId of this._baseRoles){
            let playerRole: Role = guild.roles.resolve(roleId);
            member.roles.add(playerRole);
        }
    }

    private sayHello(guild : Guild, member: GuildMember) {
        let welcomeChannel: TextChannel = <TextChannel>guild.channels.resolve(this._welcomeChannelId);
        welcomeChannel.send(`Даров, <@${member.id}>!`);
    }

    private async onVoiceStateUpdate(oldState : VoiceState, newState : VoiceState) : Promise<void>{
        await this.deleteLobbyChannelsAndRoles(oldState, newState);
        await this.deleteCategoriesAndChildren(oldState, newState);
    }

    private async deleteLobbyChannelsAndRoles(oldState : VoiceState, newState : VoiceState) {
        if(this._lobbyCategoryId === undefined) return;
        if(oldState.channel == null || oldState.channel.members.size != 0 
            || oldState.channel.parentID != this._lobbyCategoryId || oldState.channelID == this._waitChannelId ) return;
        
        // console.log(`members in chat: ${oldState.channel.members.size}`);
        // console.log(`oldState.channel exists: ${oldState.channel != null}`);
        // console.log(`newState.channel exists: ${newState.channel != null}`);

        if(oldState.channel.permissionOverwrites.size > 0){
            let poID : string = oldState.channel.permissionOverwrites.filter(po => po.id != oldState.guild.roles.everyone.id).firstKey();
            console.log(poID);
            await oldState.guild.roles.resolve(poID).delete();
        }

        await oldState.channel.delete();
    }

    private async deleteCategoriesAndChildren(oldState : VoiceState, newState : VoiceState) : Promise<void>{
        if(oldState.channel == null || oldState.channel.members.size != 0
            || oldState.channel.parentID == this._lobbyCategoryId || oldState.channelID == this._waitChannelId) return;

        let parent : CategoryChannel = oldState.channel.parent;
        for(const voiceChannel of parent.children.filter(i => typeof(i) == typeof(VoiceChannel)).values()){
            if(voiceChannel.members.size != 0) return;
        }
        for(const channel of parent.children){
            await channel[1].delete();
        }
        await parent.delete();
    }

    public dispose(): void {
        this._client.destroy();
    }
}