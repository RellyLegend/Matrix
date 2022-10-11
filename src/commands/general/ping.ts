import { Command } from '@guildedts/framework';
import { Message } from 'guilded.ts';

export default class extends Command {
	async execute(message: Message) {
		message.reply("Pong!");
	}
}