import express from "express";
import cookies from "cookies";

import { resolve } from "path";
import { Logger } from "@guildedts/framework";
import { urlencoded } from "body-parser";
import methodOverride from "method-override";

import { router as MainRouter } from "./routes/MainRouter";
import { router as AuthRouter } from "./routes/AuthRouter";
import { router as DashboardRouter } from "./routes/DashboardRouter";

const middleware = require("../utils/web/Middleware");

const app = express();

app.set('view engine', 'pug');
app.set('views', resolve('./src/app/views'));

app.use(urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookies.express(['a', 'b', 'c']));

const assetsPath = resolve('./src/app/assets');
app.use(express.static(assetsPath));
app.locals.basedir = assetsPath;

app.use(
    middleware.updateUser,
    MainRouter,
    AuthRouter,
);
app.use("/dashboard", 
    middleware.validateUser,
    middleware.updateServers,
    DashboardRouter,
);

app.get("*", (req, res) => res.render("error"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    Logger.ready(`Server listening to port ${port}!`);
});