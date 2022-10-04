import { ClientConfig } from '@guildedts/framework';
import MatrixConfig from "./config";

export default {
    token: MatrixConfig.bot.token,
    prefix: ".",
} as ClientConfig;