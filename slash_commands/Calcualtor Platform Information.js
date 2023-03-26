let PS4BansAPI = "http://arkdedicated.com/ps4banlist.txt";
let XBOXBansAPI = "http://arkdedicated.com/xboxbanlist.txt";
let RatesAPI = "https://ark.wiki.gg/index.php?title=Data:Official_server_rates&action=raw&ctype=application%2Fjson";
const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({ databasePath:"./Database/Servers.json" });
const { BotIcon, BotName, BotNameLink, EmbedColour } = require('../Database/Information.json');

module.exports = {
    name:"arkinformation",
    data: new SlashCommandBuilder()
    .setName("arkinformation")
    .setDescription("View ARK's Ban count & More"),

run: async (client, interaction) => {
 
    //PS4BansAPI
    let response2 = await fetch(PS4BansAPI);
    let data2 = await response2.text();
    let filePath2 = data2;
    let to_string2 = filePath2.toString();
    let split_lines2 = to_string2.split("\n");
    let PS4Bans = `${split_lines2.length-1}`;
    //XBOXBansAPI
    let response5 = await fetch(XBOXBansAPI);
    let data5 = await response5.text();
    let filePath5 = data5;
    let to_string5 = filePath5.toString();
    let split_lines5 = to_string5.split("\n");
    let XBOXBans = `${split_lines5.length-1}`;
    //RatesAPI=
    let response6 = await fetch(RatesAPI);
    const data6 = await response6.json();

    //official rates
    let officialTaming = data6.Official.TamingSpeedMultiplier;
    let officialHarvest = data6.Official.HarvestAmountMultiplier;
    let officialXP = data6.Official.XPMultiplier;
    let officialMaturation = data6.Official.BabyMatureSpeedMultiplier;
    let officialHatching = data6.Official.EggHatchSpeedMultiplier;
    let officialImprint = data6.Official.BabyImprintAmountMultiplier;
    let officialHexagons = data6.Official.HexagonRewardMultiplier;
    let official = `Taming: ${officialTaming} \nHarvest: ${officialHarvest} \nXP: ${officialXP} \nMaturation: ${officialMaturation} \nHatching: ${officialHatching} \nImprint: ${officialImprint} \nHexagons: ${officialHexagons}`

    //smalltribes rates
    let smallsTaming = data6.SmallTribes.TamingSpeedMultiplier;
    let smallsHarvest = data6.SmallTribes.HarvestAmountMultiplier;
    let smallsXP = data6.SmallTribes.XPMultiplier;
    let smallsMaturation = data6.SmallTribes.BabyMatureSpeedMultiplier;
    let smallsHatching = data6.SmallTribes.EggHatchSpeedMultiplier;
    let smallsImprint = data6.SmallTribes.BabyImprintAmountMultiplier;
    let smallsHexagons = data6.SmallTribes.HexagonRewardMultiplier;
    let smalls = `Taming: ${smallsTaming} \nHarvest: ${smallsHarvest} \nXP: ${smallsXP} \nMaturation: ${smallsMaturation} \nHatching: ${smallsHatching} \nImprint: ${smallsImprint} \nHexagons: ${smallsHexagons}`

    //arkpocalypse rates
    let arkpocTaming = data6.ARKpocalypse.TamingSpeedMultiplier;
    let arkpocHarvest = data6.ARKpocalypse.HarvestAmountMultiplier;
    let arkpocXP = data6.ARKpocalypse.XPMultiplier;
    let arkpocMaturation = data6.ARKpocalypse.BabyMatureSpeedMultiplier;
    let arkpocHatching = data6.ARKpocalypse.EggHatchSpeedMultiplier;
    let arkpocImprint = data6.ARKpocalypse.BabyImprintAmountMultiplier;
    let arkpocHexagons = data6.ARKpocalypse.HexagonRewardMultiplier;
    let arkpoc = `Taming: ${arkpocTaming} \nHarvest: ${arkpocHarvest} \nXP: ${arkpocXP} \nMaturation: ${arkpocMaturation} \nHatching: ${arkpocHatching} \nImprint: ${arkpocImprint} \nHexagons: ${arkpocHexagons}`

    //top 9 Searched Servers
    let response = db.all()
    let data = response.sort((b, a) => a.data - b.data).slice(0, 9);

let embed = new MessageEmbed()
.setAuthor({ name: BotName, iconURL: BotIcon, url: BotNameLink })
.setColor(EmbedColour)
.setTimestamp()
.addField(`ARK | Platform Information`, "Need help? [Support Discord](https://discord.gg/GwJKw7KP9J)")
.addField("\tXBOX Live Bans:", "```\n" +XBOXBans+"```",true)
.addField("\tPlayStation Bans:", "```\n" +PS4Bans+"```",true)
.addField("\u200b","\u200b ",true)
.addField("\tOfficial Rates:", "```\n" +official+ "```",true)
.addField("\tSmall Tribes Rates:", "```\n" +smalls+ "```",true)
.addField("\tARKpocalypse Rates:", "```\n" +arkpoc+ "```",true)
.addField("\u200b","\u200b ",true)
.addField("\u200b","\u200b ")
.addField("\u200b","\u200b ",true)
.addField("Top 9 Searched Servers:","\u200b ",true)
.addField("\u200b","\u200b",true)
data.forEach(u => {
    embed.addField(`${u.ID}`,`**Searched:** ${u.data} Times`,true);
 })

return interaction.followUp({ embeds: [embed] })      
}
}