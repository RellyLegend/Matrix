import express from 'express';
import MatrixConfig from "../../../config";
import { authClient } from '../../utils/web/AuthClient';
const middleware = require("../../utils/web/Middleware");
const wait = require('node:timers/promises').setTimeout;

export const router = express.Router();

router.get('/login', (req, res) => {
    if (req.query.prompt) {
        if (req.query.prompt === "consent") {
            res.redirect(`https://authlink.guildedapi.com/auth?client_id=${MatrixConfig.bot.id}&scope=identify+servers+servers.members.read&redirect_uri=${MatrixConfig.dashboard.url}/auth`)
        } else if (req.query.prompt === 'none') {
            res.redirect(`https://authlink.guildedapi.com/auth?client_id=${MatrixConfig.bot.id}&scope=identify+servers+servers.members.read&redirect_uri=${MatrixConfig.dashboard.url}/auth&prompt=none`)
        }
    }
    return res.redirect(`https://authlink.guildedapi.com/auth?client_id=${MatrixConfig.bot.id}&scope=identify+servers+servers.members.read&redirect_uri=${MatrixConfig.dashboard.url}/auth&prompt=none`)
});

router.get("/auth", async (req, res) => {
    try {
        const code = req.query.code;
        const accessCode = await authClient.getAccessCode(code);
        const token = accessCode.access_token;

        // @ts-ignore
        res.cookies.set("token", token);
        res.redirect("/dashboard");
    } catch {
        res.redirect('/');
    }
});

router.get("/logout", (req, res) => {
    if (res.locals.user) {
        // @ts-ignore
        res.cookies.set("token", null);
        if (req.query.redirect) res.redirect(`${req.query.redirect}`);
        else res.redirect("/");
    } else {
        res.render('error');
    }
});