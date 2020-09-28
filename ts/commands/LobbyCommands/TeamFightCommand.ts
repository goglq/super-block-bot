import { CategoryChannel, Message, VoiceChannel, Role, GuildChannel } from "discord.js";
import { NoRequiredParameterException } from "../../exceptions/NoRequiredParameterException";
import { CommandBase } from "../CommandBase";

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

        let roles : [Role, Role] = await this.CreateRoles(msg, firstTeamName, secondTeamName);
        await this.GrantRoles(msg, args, roles);
        await this.CreateVoiceChannels(msg, firstTeamName, secondTeamName, roles);
    }

    private async CreateRoles(msg :Message, firstTeamName :string, secondTeamName :string) :Promise<[Role , Role]>{
        let firstTeamRole :Role = await msg.guild.roles.create({
            data:{
                name: firstTeamName,
                color: 'DEFAULT',
            }
        });
        let secondTeamRole :Role = await msg.guild.roles.create({
            data: {
                name: secondTeamName,
                color: 'DEFAULT',
            }
        });
        return [firstTeamRole, secondTeamRole];
    }

    private async GrantRoles(msg :Message, args :string[], roles :[Role, Role]) : Promise<void>{
        let playerMentionStarts : [number, number] = [args.indexOf('-p1'), args.indexOf('-p2')]; 
        if(playerMentionStarts[0] <= -1 || playerMentionStarts[1] <= -1) throw new NoRequiredParameterException();

        this.GrantRole(msg, playerMentionStarts[0] + 1, roles[0], '-p2', args);
        this.GrantRole(msg, playerMentionStarts[1] + 1, roles[1], '-p1', args);
    }

    private GrantRole(msg :Message, startIndex :number, role :Role, endFlag: string, args :string[]){
        for(let i:number = startIndex; i < args.length || args[i] == endFlag; i++){
            let memberId = args[i].slice(3, args[i].length - 1);
            msg.guild.members.resolve(memberId).roles.add(role);
        }
    }

    private async CreateVoiceChannels(msg :Message, firstTeamName :string, secondTeamName :string, roles :[Role, Role]) : Promise<void>{
        let parentCategory : CategoryChannel = await msg.guild.channels.create(`${firstTeamName} vs. ${secondTeamName}`, {type: 'category'});
        let commonVoiceChannel : VoiceChannel = await msg.guild.channels.create('Common Channel', {
            type: 'voice', 
            parent: parentCategory,
            permissionOverwrites: [
                {id: roles[0], allow: ['CONNECT', 'VIEW_CHANNEL']},
                {id: roles[1], allow: ['CONNECT', 'VIEW_CHANNEL']},
                {id: msg.guild.roles.everyone, deny: ['CONNECT', 'VIEW_CHANNEL']}
            ]
        });
        let firstTeamVoiceChannel : VoiceChannel = await this.CreateVoiceTeamChannel(msg, firstTeamName, roles[0], parentCategory);
        let secondTeamVoiceChannel : VoiceChannel = await this.CreateVoiceTeamChannel(msg, secondTeamName, roles[1], parentCategory);

        setTimeout(async () => await this.DeleteVoiceChannelsOnTimeOut(parentCategory), 5000);
    }

    private async DeleteVoiceChannelsOnTimeOut(category :CategoryChannel) : Promise<void>{
        for(const channel of category.children.values()){
            await channel.delete();
        }
        await category.delete();
    }

    private async CreateVoiceTeamChannel(msg :Message, teamName :string, role :Role, parent :CategoryChannel) : Promise<VoiceChannel>{
        return await msg.guild.channels.create(teamName, {
            type: 'voice',
            parent: parent,
            permissionOverwrites: [
                {id: role, allow: ['CONNECT', 'VIEW_CHANNEL']},
                {id: msg.guild.roles.everyone, deny: ['CONNECT', 'VIEW_CHANNEL']}
            ]
        })
    }
}