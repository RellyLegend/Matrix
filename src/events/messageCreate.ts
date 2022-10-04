import { Event } from '@guildedts/framework';
import { Message } from "guilded.ts";
import { getServerData } from '../data/servers';
import { client } from '..';

export default class extends Event {
	async execute(message: Message) {
        const serverData = await getServerData(`${message?.serverId}`);
        const prefix = serverData.settings?.prefix;
        if (message.author?.user.type === 'bot' && !message?.content?.startsWith(`${prefix}`)) return;
        const args = message?.content?.slice(prefix?.length).trim().split(/ +/g);
        const commandName = args?.shift()?.toLowerCase() as string;
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return;
        serverData.ranCommands += 1;
        serverData.save();
	}
}