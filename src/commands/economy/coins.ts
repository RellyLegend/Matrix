import { Command } from '@guildedts/framework';
import { Embed, Message, UserType } from 'guilded.ts';
import { getUserData } from '../../data/users';

export default class extends Command {
	async execute(message: Message) {
        const server = await message.fetchServer();
        if (message.mentions?.users?.length !== 1) {
            const user = (await message.fetchAuthor()).user;
            const userData = await getUserData(`${user?.id}`);
            const balanceEmbed = new Embed()
            .setColor("BLUE")
            .setAuthor(`🪙${user?.name}'s Coins`)
            .addField(`👜Wallet`, `**${userData?.wallet}** coins`)
            .addField(`🏦Bank`, `**${userData?.bank}** coins`)
            .setTimestamp();
            return message.reply({ embeds: [balanceEmbed] });
        } else {
            const member = await server.members.fetch(`${message.mentions.users[0].id}`);
            const user = member.user;
            if (user.type === "bot") return message.reply(`Invalid user.`);
            const userData = await getUserData(`${user?.id}`);
            const balanceEmbed = new Embed()
            .setColor("BLUE")
            .setAuthor(`🪙${user?.name}'s Coins`)
            .addField(`👜Wallet`, `**${userData?.wallet}** coins`)
            .addField(`🏦Bank`, `**${userData?.bank}** coins`)
            .setTimestamp();
            return message.reply({ embeds: [balanceEmbed] });
        }
    }
}