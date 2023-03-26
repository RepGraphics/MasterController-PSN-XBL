const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const snekfetch = require('snekfetch');
const { BotIcon, BotName, BotNameLink, XBOXEmbedColour } = require('./../Database/Information.json');

module.exports = {
    name:"xboxunofficial",
    data: new SlashCommandBuilder()
    .setName("xboxunofficial")
    .setDescription("Retrieves XBOX Unofficial Server Info")
    .addStringOption(option => option.setName('server').setDescription('Enter Server Name').setRequired(true)),

run: async (client, interaction) => {

    const query = interaction.options.getString('server');

    const exceedembed = new MessageEmbed()
    .setAuthor({ name: BotName, iconURL: BotIcon, url: BotNameLink })
    .setDescription(`Too many results, please use a more specific search`)
    .setColor(XBOXEmbedColour) 

    let error = "This Server couldn't be found, it may be offline or doesn't exist, Ensure it's 100% spelt correctly and that it's the **FULL** server name."
    const NSFembed = new MessageEmbed()
    .setAuthor({ name: BotName, iconURL: BotIcon, url: BotNameLink })
    .setColor(XBOXEmbedColour)
    .setTimestamp()
    .addField(`Command Response Time: [0.${Math.floor(Date.now() - (interaction.createdTimestamp / 1000)) % 60}s]`, "To Report A Down Unofficial Server contact the server owners.")
    .addField("\tError:", "```\n" +error+"```")

    let search = query.toString();

    snekfetch.get("http://arkdedicated.com/xbox/cache/unofficialserverlist.json").then(r => {
        let server = search;
        let body = r.body;
        let data = body.filter(cluster => cluster.Name.toLowerCase().includes(server.toLowerCase()));
        if(!data) { return interaction.followUp({ embeds: [NSFembed] })
        } else {

const embed = new MessageEmbed()
.setAuthor({ name: BotName, iconURL: BotIcon, url: BotNameLink })
.setDescription(`ARK | Xbox Unofficial`)
.setColor(XBOXEmbedColour)
.setTimestamp()
.addField(`Command Response Time: [0.${Math.floor(Date.now() - (interaction.createdTimestamp / 1000)) % 60}s]`, "Need help? [Support Discord](https://discord.gg/GwJKw7KP9J)")
         
data.forEach(un => {
let servername = un.Name;
let players = `${un.NumPlayers} / ${un.MaxPlayers}`;
let map = un.MapName;
let day = un.DayTime;
let ip = un.IP;
let port = un.Port;
embed.addField(`${servername}`,`Players: ${players}\nMap: ${map}\nDay:${day}\nIP: ${ip}\nPort: ${port}`,true);
})
return interaction.followUp({ embeds: [embed] }).catch(error => {
    if (error.code === 50035) return interaction.followUp({ embeds: [exceedembed] })
}); 
    } 
    })
}
}
