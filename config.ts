export default {
    bot: {
        id: "bc6bc946-becc-48d0-a444-6ffd4dd3df73",
        secret: `${process.env.CLIENT_SECRET}`,
        token: `${process.env.CLIENT_TOKEN}`,
    },

    dashboard: {
        url: "http://localhost:3000",
    },

    mongoDB: process.env.MONGO_DB,
};