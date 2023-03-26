const { Client, Intents, Collection } = require("discord.js");
const { BotToken, OwnerID, BotActivity } = require('./Database/Information.json');
client = new Client( { intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_MESSAGES  ] })

client.slash_commands = new Collection();
client.contextMenus = new Collection();
client.buttonCommands = new Collection();
client.aliases = new Collection();
client.settings = { OwnerID }

for(let handler of  ["slash_command", "event"]) require(`./handlers/${handler}`)(client);

client.login(BotToken)

client.on('ready', () => {
    client.user.setActivity(BotActivity, {type: "PLAYING"});
});