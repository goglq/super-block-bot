import {Client, Message} from 'discord.js';
import {CommandBase} from './commands/CommandBase';

interface IDisposable{
    dispose(): void;
}

export class Bot implements IDisposable{
    private _client : Client;
    private _prefix : string;
    private _token : string;
    private _commands : Array<CommandBase>;

    constructor(){
        this._client = new Client();
        const {prefix, token} = require('../botconfig.json');
        this._token = token;
        this._prefix = prefix;
        this._client.on('message', (message : Message) => this.onMessageRecieved(message, this._prefix));
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
            if(command.CommandName === commandName){
                command.execute(msg, args);
            }
        }
    }

    public dispose(): void {
        this._client.destroy();
    }
}