import fetch from "node-fetch";
import { client } from "..";

export function fetchServer(serverId: any) {
    const authToken = client.token;
    return fetch(`https://www.guilded.gg/api/v1/servers/${serverId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        // @ts-ignore
    }).then(res => res.json())
    // @ts-ignore
    .then(res => {
        return res;
    });
}