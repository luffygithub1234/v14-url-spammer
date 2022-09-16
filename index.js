const {
    Client,
    GatewayIntentBits,
    Partials,
} = require("discord.js");
const fs = require("fs");
const config = require("./config.js");
const client = new Client({
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.GuildMember,
    ],
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
});

module.exports = client;

fs.readdir("./events", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`👌 Loadded Event: ${eventName}`);
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});


client.login(config.TOKEN || process.env.TOKEN).catch(e => {
    console.log("Botun tokeni yanlış ve ya intentlerin ynlaış kruL:'9!")
})

const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
    response.sendStatus(200);
});
app.listen(process.env.PORT);