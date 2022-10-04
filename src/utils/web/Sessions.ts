const sessions = new Map();

import { authClient } from "./AuthClient";
import { fetchServer } from "../servers";

export function get(token: string) {
    return sessions.get(token) ?? create(token);
};

async function create(token: string) {
    setTimeout(() => sessions.delete(token), 5 * 60 * 1000);
    await update(token);
    
    return sessions.get(token);
};

export async function update(token: string) {
    const user = await authClient.getUser(token);
    return sessions.set(token, {
        authUser: user,
        servers: await getManageableServers(await authClient.getUserServers(token), user.id),
    });
}

// @ts-ignore
async function getManageableServers(authServers, userId) {
    const servers = new Array();
    for (const server of authServers) {
        const foundServer = await fetchServer(server.id);
        if (foundServer?.server?.id) {
            if (foundServer?.server?.ownerId === userId) servers.push(foundServer.server);
        }
    }
    return servers;
}