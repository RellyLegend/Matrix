import Client, { Event, Logger } from '@guildedts/framework';
import mongoose from 'mongoose';
import MatrixConfig from "../../config";
import { Server } from '../data/models/Server';

export default class extends Event {
	async execute(client: Client) {
        /** Connect to MongoDB */
		mongoose.connect(`${MatrixConfig.mongoDB}`)
        .then(() => Logger.event(`Connected to the MongoDB Database.`))
        .catch((err) => Logger.error(`Unable to connect to the MongoDB Database: ${err}`));

        /** Set the prefix for servers. */
        const servers = await Server.find({});
        for (const server of servers) {
			client.prefixes.set(server.serverId, `${server.settings?.prefix}`);
		};
        Logger.event(`Loaded ${client.prefixes.size} custom server prefixes.`)
	}
}