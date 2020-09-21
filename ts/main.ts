import {Client, Message, VoiceState} from 'discord.js';
import {CommandBase} from './commands/CommandBase';

interface IDisposable{
    dispose(): void;
}

export class Bot implements IDisposable{
    private _client : Client;
    private _prefix : string;
    private _token : string;
    private _commands : Array<CommandBase>;

    private _waitChannelId : string = '754427337692545125';
    private _lobbyCategoryId : string = '754408581167710358';

    constructor(){
        this._client = new Client();
        const {prefix, token} = require('../botconfig.json');
        this._token = token;
        this._prefix = prefix;
        this._client.on('message', (message : Message) => this.onMessageRecieved(message, this._prefix));
        this._client.on('voiceStateUpdate', (oldState, newState) => this.onVoiceStateUpdate(oldState, newState));
    }

    public start() : void{
        this._client.login(this._token)
            .then(bot => console.log(`Successfully logged in as ${bot}`))
            .catch(console.error);
    }

    public setCommands(commands : Array<CommandBase>){
        this._commands = commands;
    }

    private onMessageRecieved(msg : Message, prefix : string) : void{
        console.log(prefix);
        if(!msg.content.startsWith(prefix) || msg.author.bot) return;

        const args : string[] = msg.content.slice(this._prefix.length).trim().split(' ');
        const commandName : string = args.shift().toLowerCase();

        for(const command of this._commands){
            if(command.CommandName == commandName){
                command.execute(msg, args);
            }
        }
    }

    private onVoiceStateUpdate(oldState : VoiceState, newState : VoiceState) : void{
        if(oldState.channel == null || oldState.channel.members.size != 0 
            || oldState.channel.parentID != this._lobbyCategoryId || oldState.channelID == this._waitChannelId ) return;
        
        console.log(`members in chat: ${oldState.channel.members.size}`);
        console.log(`oldState.channel exists: ${oldState.channel != null}`);
        console.log(`newState.channel exists: ${newState.channel != null}`);
        oldState.channel.delete().then(console.log).catch(console.error);

        if(oldState.channel.permissionOverwrites.size > 1){
            let poID : string = oldState.channel.permissionOverwrites.filter(po => po.id != oldState.guild.roles.everyone.id).firstKey();
            console.log(poID);
            oldState.guild.roles.resolve(poID).delete().then(console.log).catch(console.error);
        }
    }

    public dispose(): void {
        this._client.destroy();
    }
}