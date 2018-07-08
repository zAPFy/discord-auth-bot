
const Discord = require("discord.js");
const config = require("./config.json");
const request = require('request');


const bot = new Discord.Client();



bot.on("ready", () => {
    console.log('Bot has started.'); 
    bot.user.setActivity('Ready to authenticate users!');
});

bot.on("guildCreate", guild => {
    // bot joins a guild/server.
    console.log(`New server joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

bot.on("guildDelete", guild => {
    // bot is removed from a guild/server.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});


bot.on("message", async message => {

    // Ignore any message that does not start with our prefix or are sent by bots
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  

    // Separate our "command" name, and our "arguments" for the command. 
    // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
    // command = say
    // args = ["Is", "this", "the", "real", "life?"]
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    
  
    if(command === "ping") {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    }

    if(command === "auth") {

        let role = message.guild.roles.find("name", config.authRole);
        let member = message.member;

        const options = {  
            url: config.wordpressApiUrl,
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'User-Agent': 'discord-auth-bot'
            },
            multipart: [{ 
                'content-type': 'application/json',
                body: JSON.stringify({
                    discordID: message.author.id,
                    authKey: args[0]
                }),
            }],
        };

        request(options, function(err, res, body) {  
            if(res.statusCode == 201) {
                console.log('Authenticated user');
                member.addRole(role).catch(console.error);
            } else {
                console.log('error: '+ res.statusCode);
                console.log(body);
            }
        });

        message.delete();
    }
    


  
});

bot.login(config.token);