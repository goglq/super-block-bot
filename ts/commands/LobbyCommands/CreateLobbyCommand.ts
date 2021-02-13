import { CategoryChannel, GuildChannel, GuildMember, Message, PermissionOverwrites, Role, VoiceChannel } from "discord.js";
import { setTimeout } from "timers";
import { Bot } from "../../Bot";
import { NoRequiredIdException } from "../../exceptions/NoRequiredIdException";
import { NoRequiredParameterException } from "../../exceptions/NoRequiredParameterException";
import { CommandBase } from "../CommandBase";

export class CreateLobbyCommand extends CommandBase{
    private DefaultLobbyName : string = 'Lobby';
    constructor(commandName? : string){
        super(commandName);
    }

    public execute(msg: Message, args: string[]): void {
        if(Bot.Instance.LobbyCategoryId === undefined) throw new NoRequiredIdException();

        let parentCategory : CategoryChannel =  <CategoryChannel>msg.guild.channels.resolve('754408581167710358');
        let lobbyName : string = args.length >= 1 ? args.shift() : `${this.DefaultLobbyName} #${parentCategory.children.size}`;
        if(args.indexOf('-p') > -1){
            args.shift();
            this.createPrivateChannelAsync(msg, lobbyName, parentCategory, args);
        }
        else{
            this.createPublicChannel(msg, lobbyName, parentCategory);
        }
    }

    private async createPrivateChannelAsync(msg: Message, lobbyName: string, parentCategory: CategoryChannel, args: string[]): Promise<void>{
        if(msg.mentions.users.size < 1) throw new NoRequiredParameterException();
        
        let newRole : Role = await msg.guild.roles.create({
                data: { 
                name: lobbyName, 
                color: 'DEFAULT',
            }
        });
        let everyOne : Role = msg.guild.roles.everyone;
        msg.member.roles.add(newRole);
        for(const user of msg.mentions.users){
            let member :GuildMember = msg.guild.member(user[1]);
            member.roles.add(newRole);
        }
        let channel :VoiceChannel = await msg.guild.channels.create(lobbyName, { 
            type: 'voice', 
            parent: parentCategory,
            permissionOverwrites: [
                {id: newRole, allow: ['VIEW_CHANNEL', 'CONNECT']},
                {id: everyOne, deny: ['VIEW_CHANNEL', 'CONNECT']}
            ] 
        });
        setTimeout(async () => this.DeleteChannelOnTimeOut(channel), 5000);
    }

    private async createPublicChannel(msg: Message, lobbyName: string, parentCategory: CategoryChannel): Promise<void>{
        let channel :GuildChannel = await msg.guild.channels.create(lobbyName, { type: 'voice', parent: parentCategory});
        setTimeout(async () => this.DeleteChannelOnTimeOut(channel), 5000);
    }

    private async DeleteChannelOnTimeOut(channel :GuildChannel): Promise<void>{
        if(channel.members.size > 0) return;
        let channelPermissions = channel.permissionOverwrites
            .filter(permissionOverwrite => permissionOverwrite.id != channel.guild.roles.everyone.id)
            .values();
        for(const role of channelPermissions)
            await channel.guild.roles.resolve(role.id).delete();
        await channel.delete();
    }
}