# discord-auth-bot
go to https://discordapp.com/developers
click my apps and create a new one.
Then at the bottom add a bot uer and copy its token into config.json
where you also need to supply other info like the api endpoint and the role that users should get after authenticating.


To add the bot to your server:
Navigate to the Applications page and select your bot applications.
In the App Details section, find the Client ID.

Replace the CLIENTID in the following link with your bot's client ID:
https://discordapp.com/oauth2/authorize?client_id=CLIENTID&scope=bot


You also need to give the bot premission to manage users and delete messages.


To setup the bot, run "npm install" and then "npm start"

And to authenticate users they type "!auth 982yrinfdsn012urnfasl" 
code gets sent to your api with discord user id.
If you respond with satuscode 201 it adds the user to the specifyed user role.
after that it delets the message.