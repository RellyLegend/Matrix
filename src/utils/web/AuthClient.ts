const Authlink = require("guilded-authlink");
import MatrixConfig from "../../../config";

export const authClient = new Authlink.Client();

authClient.setClientId(MatrixConfig.bot.id);
authClient.setClientSecret(MatrixConfig.bot.secret);
authClient.setRedirectUri(`${MatrixConfig.dashboard.url}/auth`);