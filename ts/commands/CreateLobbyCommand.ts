import { CategoryChannel, GuildChannel, Message, PermissionOverwrites, Role, VoiceChannel } from "discord.js";
import { setTimeout } from "timers";
import { CommandBase } from "./CommandBase";

export class CreateLobbyCommand extends CommandBase{
    private DefaultLobbyName : string = 'Lobby';

    constructor(commandName? : string){
        super(commandName);
    }

    public execute(msg: Message, args: string[]): void {
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

        let newRole : Role = await msg.guild.roles.create({
                data: { 
                name: lobbyName, 
                color: 'DEFAULT',
            }
        })

        let everyOne : Role = msg.guild.roles.everyone;
        
        msg.member.roles.add(newRole);
        for(const mention of args){
            let memberId: string = mention.slice(3, mention.length - 1);
            console.log(memberId);
            msg.guild.members.resolve(memberId).roles.add(newRole);
        }


        msg.guild.channels.create(lobbyName, { 
            type: 'voice', 
            parent: parentCategory,
            permissionOverwrites: [
                {id: newRole, allow: ['VIEW_CHANNEL', 'CONNECT']},
                {id: everyOne, deny: ['VIEW_CHANNEL', 'CONNECT']}
            ] 
        }).then(channel => {
            console.log(channel.permissionOverwrites);
            setTimeout(async () => {
                if(channel.members.size == 0){
                    await channel.delete();
                    await newRole.delete();
                }
            }, 5000);
        }).catch(console.error);
    }

    private createPublicChannel(msg: Message, lobbyName: string, parentCategory: CategoryChannel): void{
        msg.guild.channels.create(lobbyName, { type: 'voice', parent: parentCategory})
            .then(channel => {
                console.log(channel);
                setTimeout(async () => {
                    if(channel.members.size == 0) await channel.delete();
                }, 5000);
            })
            .catch(console.error);
    }
}