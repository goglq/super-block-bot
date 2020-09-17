import {Client, Collection, Message} from 'discord.js';
import {CommandBase} from './commands/CommandBase';

export class Bot{
    private _client : Client;
    private _prefix : string;
    private _token : string;
    private _commands : Collection<CommandBase, Function>;

    constructor(){
        this._client = new Client();
        const {prefix, token} = require('../botconfig.json');
        this._token = token;
        this._prefix = prefix;
        this._client.on('message', this.onMessageRecieved)
    }

    public start() : void{
        this._client.login(this._token)
            .then(bot => console.log(`Successfully logged in as ${bot}`))
            .catch(console.error);
    }

    public onMessageRecieved(msg : Message) : void{
        if(!msg.content.startsWith(this._prefix) || msg.author.bot) return;

        const args = msg.content.slice(this._prefix.length).trim().split(' ');
        const command = args.shift().toLowerCase();
    }
}