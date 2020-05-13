const Discord = require("discord.js")
const client = new Discord.Client();
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OTYyMDMyNTM1NjI3Mzc0MyIsImJvdCI6dHJ1ZSwiaWF0IjoxNTg4NTIyNTgzfQ.QULutV5dqmmcNdFD4pwiehlpFKDFFPcT0BzXliK2cZA', client);

// Optional events
dbl.on('posted', () => {
    console.log('Server count posted!');
})

dbl.on('error', e => {
    console.log(`Oops! ${e}`);
})
const fs = require("fs");
const config = require("./config.json");
const db = require("quick.db")
var errorAmount;



//Command Handler
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    console.log("Starting Ellie...")


    if (err) {
        var errorAmount = errorAmount + 1;
        console.log(`[${errorAmount}] There was an error.`);
        throw err;
    }

    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        console.log("Successfully loaded " + file)
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
    });
});
//Events "handler"
fs.readdir('./events/', (err, files) => {
    if (err) {
        var errorAmount = errorAmount + 1;
        console.log(`[${errorAmount}] There was an error.`);
        throw err;
    }

    files.forEach(file => {
        let eventFunc = require(`./events/${file}`);
        console.log("Successfully loaded " + file)
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunc.run(client, ...args));
    });
});



client.on("ready", () => {
    console.log("✅ Ellie has started.");
    console.log("#️⃣ Serving " + client.guilds.size + " guilds.");
    console.log(" ❕ This code is private and should not be distributed unless given explicit permission by Pranav Ramesh.");
    console.log(" © Pranav Ramesh 2020 - 2021")


    setInterval(function () {
        client.user.setActivity(`$help | elliebot.xyz`, {
            type: 'PLAYING'
        });
    }, 10000);

});

client.login(config.token);