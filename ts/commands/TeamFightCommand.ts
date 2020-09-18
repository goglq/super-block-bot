import { CategoryChannel, Message, VoiceChannel } from "discord.js";
import { CommandBase } from "./CommandBase";

export class TeamFightCommand extends CommandBase{
    constructor(commandName : string){
        super(commandName);
    }

    public async execute(msg: Message, args: string[]): Promise<void> {
        let firstTeamName :string = 'Pink Team';
        let secondTeamName :string = 'Cyan Team';

        if(args.indexOf('-t1') > -1 && args.indexOf('-t2') > -1){
            firstTeamName = args[args.indexOf('-t1') + 1];
            secondTeamName = args[args.indexOf('-t2') + 1];
        }

        let parentCategory : CategoryChannel = await msg.guild.channels.create(`${firstTeamName} vs. ${secondTeamName}`, {type: 'category'});
        let commonVoiceChannel : VoiceChannel =await msg.guild.channels.create('Common Channel', {type: 'voice', parent: parentCategory});
        let firstTeamVoiceChannel : VoiceChannel = await msg.guild.channels.create(`${firstTeamName}`, {type: 'voice', parent: parentCategory});
        let secondTeamVoiceChannel : VoiceChannel = await msg.guild.channels.create(`${secondTeamName}`, {type: 'voice', parent: parentCategory});
    }
}