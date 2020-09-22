import { Message } from "discord.js";

export interface ICommand{
    CommandName: string;
    execute(msg :Message, args :string[]): void;
}