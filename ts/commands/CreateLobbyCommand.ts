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
        let lobbyName : string = args.length >= 1 ? args[0] : `${this.DefaultLobbyName} #${parentCategory.children.size}`;
        if(args.indexOf('-p') > -1){
            this.createPrivateChannelAsync(msg, lobbyName, parentCategory);
        }
        else{
            this.createPublicChannel(msg, lobbyName, parentCategory)
        }
    }

    private async createPrivateChannelAsync(msg: Message, lobbyName: string, parentCategory: CategoryChannel): Promise<void>{

        let newRole : Role = await msg.guild.roles.create({
                data: { 
                name: lobbyName, 
                color: 'DEFAULT',
                permissions: ['CONNECT', 'VIEW_CHANNEL']
            }
        })
        let everyOne : Role = msg.guild.roles.everyone;

        msg.guild.roles.everyone

        msg.guild.channels.create(lobbyName, { 
            type: 'voice', 
            parent: parentCategory,
            permissionOverwrites: [
                {id: newRole },
                {id: everyOne, deny: ['VIEW_CHANNEL', 'CONNECT']}
            ] 
        }).then(channel => {
            console.log(channel);
            setTimeout(() => {
                channel.delete();
            }, 5000);
        }).catch(console.error);
    }

    private createPublicChannel(msg: Message, lobbyName: string, parentCategory: CategoryChannel): void{
        msg.guild.channels.create(lobbyName, { type: 'voice', parent: parentCategory})
            .then(channel => {
                console.log(channel);
                setTimeout(() => {
                    channel.delete();
                }, 5000);
            })
            .catch(console.error);
    }
}