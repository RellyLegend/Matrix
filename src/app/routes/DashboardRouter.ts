import express from 'express';
import { client } from '../..';
import { getServerData } from '../../data/servers';
import { fetchServer } from '../../utils/servers';

const middleware = require("../../utils/web/Middleware");

export const router = express.Router();

router.get('/', (req, res) => res.render('dashboard/index'));

router.get("/servers/:id", middleware.validateGuild, async (req, res) => {
    const id = req.params.id;
    const foundServer = await fetchServer(id);
    if (!foundServer?.server?.id) return res.render("error", { message: "Server not found" });
    if (foundServer?.server?.ownerId === res.locals.user.id) {
        const serverData = await getServerData(id);
        const server = {
            info: foundServer.server,
            data: serverData,
        };
        res.render("dashboard/server", { server });
    } else {
        res.render("error", { message: "You do not have permission to view this server." });
    }
});

router.put("/servers/:id/:module", middleware.validateGuild, async (req, res) => {
    try {
        const { id, module } = req.params;
        const serverData = await getServerData(id);
        if (req.body.prefix) {
            if (req.body.prefix.length > 1) return res.render("error", { message: "Prefix must be only 1 character." });
            client.prefixes.set(id, req.body.prefix);
        }
        // @ts-ignore
        serverData[module] = req.body;
        serverData.save();
        res.redirect(`/dashboard/servers/${id}#${module}Module`);
    } catch {
        res.render("error", { code: 400, message: "The server denied your request." });
    }
});