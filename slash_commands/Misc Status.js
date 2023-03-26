const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({ databasePath:"./Database/CommandsUsed.json" });
const { BotIcon, BotName, BotNameLink, EmbedColour, DeveloperID, ClientID, Version } = require('../Database/Information.json');

module.exports = {
    name:"status",
    data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Displays information on the bot"),

run: async (client, interaction) => {

        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        const developer = `<@${DeveloperID}>`;
        const botid = `${ClientID}\n<@${ClientID}>`;
        const servers = `${client.guilds.cache.size}`;
        let commandsused = db.get("commandsused");
        const details = `Commands Used: [${commandsused}]\nVersion: [${Version}]\nServers: [${servers}]`;
        const serverinfo = `Uptime: ${days}d ${hours}h ${minutes}m ${seconds}s\nPing: ${Date.now() - interaction.createdTimestamp} ms`

                 const embed = new MessageEmbed()  
                 .setAuthor({ name: BotName, iconURL: BotIcon, url: BotNameLink })
                 .setColor(EmbedColour)
                 .setTimestamp()
                 .addField(`\tDetails:`, `${details}`)
                 .addField("\tDeveloper:",  `${developer}`,true)
                 .addField("\tBotID:",  `${botid}`,true)
                 .addField("\tServer Information:",      `${serverinfo}`,true)
                 return interaction.followUp({ embeds: [embed] }) 
            }
        }