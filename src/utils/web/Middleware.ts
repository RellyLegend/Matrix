import { get, update } from "./Sessions";

// @ts-ignore
module.exports.updateServers = async (req, res, next) => {
    try {
        const token = res.cookies.get("token");
        if (token) {
            const { servers } = await get(token);
            res.locals.servers = servers;
        }
    } finally {
        next();
    }
}

// @ts-ignore
module.exports.updateUser = async (req, res, next) => {
    try {
        const token = res.cookies.get("token");
        if (token) {
            const { authUser } = await get(token);
            res.locals.user = authUser;
        }
    } finally {
        next();
    }
}

// @ts-ignore
module.exports.validateGuild = async (req, res, next) => {
    // @ts-ignore
    res.locals.server = res.locals.servers.find(s => s.id === req.params.id);
    return (res.locals.server) ? next() : res.render("error", { code: 404, message: "Server not found." });
}

// @ts-ignore
module.exports.validateUser = async (req, res, next) => {
    return (res.locals.user) ? next() : res.render("error", { code: 401, message: "You must be logged in to access this page." });
}