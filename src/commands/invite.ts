import { Command } from '@guildedts/framework';
import { Embed, Message } from 'guilded.ts';
import MatrixConfig from "../../config";

export default class extends Command {
	execute(message: Message) {
        const inviteEmbed = new Embed()
        .setTitle(`Do you want to invite me to your server?`)
        .setDescription(`[Clcik here to invite Matrix](https://guilded.gg/b/${MatrixConfig.bot.id}) | [Support Server](https://guilded.gg/matrix)`)
        .setColor("BLUE");
		message.reply({ embeds: [inviteEmbed] });
	}
}
