const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { BotIcon, BotName, BotNameLink, EmbedColour, InviteLink, SupportDiscord } = require('../Database/Information.json');

module.exports = {
    name:"invite",
    data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Invite the bot to your server."),

run: async (client, interaction) => {

                 const embed = new MessageEmbed()
                 .setAuthor({ name: BotName, iconURL: BotIcon, url: BotNameLink })
                 .setDescription("*Ensure the bot has all the permissions it needs else it won't work.*")
                 .setColor(EmbedColour)
                 .setThumbnail("https://cdn.discordapp.com/avatars/846029909726068767/64af9056c2b4122e03079cc55bb3b9a0.webp?size=1024")
                 .setTimestamp()
                 .addField("\tInvite Link:", `[Click Here](${InviteLink})`, true)  
                 .addField("\tCommunity Discord:", `[Click Here](${SupportDiscord})`, true)         
                 return interaction.followUp({ embeds: [embed] }) 
                }      
    }