const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({ databasePath:"./Database/CommandsUsedLeaderboard.json" });
const { BotIcon, BotName, BotNameLink, EmbedColour } = require('../Database/Information.json');

module.exports = {
    name:"leaderboard",
    data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Displays the bot usage Leaderboard"),

run: async (client, interaction) => {

        let sleep = async (ms) => await new Promise(r => setTimeout(r,ms));
        let response = db.all()
        let data = response.sort((b, a) => a.data - b.data).slice(0, 9);

                 const embed = new MessageEmbed()  
                 .setAuthor({ name: BotName, iconURL: BotIcon, url: BotNameLink })
                 .setDescription("*Current Command Usage Leaderboard.*")
                 .setColor(EmbedColour)
                 .setTimestamp()

            data.forEach(async u => { 
                await client.users.fetch(u.ID).then(async user => {
                embed.addField(`\u200b`,`**${user.tag}**\nCommands Used: ${u.data}`,true)
                })
            }) 
            await sleep(10000)
            return interaction.followUp({ embeds: [embed] }) 
        }
    }