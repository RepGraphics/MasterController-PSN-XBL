const psOfficials = "http://arkdedicated.com/sotfps4/cache/officialserverlist.json";
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { JsonDatabase } = require("wio.db");
const serverdb = new JsonDatabase({ databasePath:"./Database/Servers.json" });
const { BotIcon, BotName, BotNameLink, PSEmbedColour } = require('./../Database/Information.json');

module.exports = {
    name:"playstationofficial",
    data: new SlashCommandBuilder()
    .setName("playstationofficial")
    .setDescription("Lookup PlayStation Official Server Information.")
    .addStringOption(option => option.setName('cluster').setDescription('Choose your Server Cluster').setRequired(true)
    .addChoices(
        {"name": "Official", "value": "official"},
        {"name": "SmallTribes", "value": "smalltribes"},
        {"name": "ARKpocalypse", "value": "arkpocalypse"},
        {"name": "CrossARK", "value": "crossark"},
    ))
    .addNumberOption(option => option.setName('serverorcluster').setDescription('Enter Server/Cluster Number').setRequired(true))
    .addStringOption(option => option.setName('mapname').setDescription('Enter Map Name')
    .addChoices(
        { "name": 'The Island', "value": 'TheIsland' },
        { "name": 'The Center', "value": 'TheCenter' },
        { "name": 'Scorched Earth', "value": 'ScorchedEarth_P' },
        { "name": 'Ragnarok', "value": 'Ragnarok' },
        { "name": 'Aberration', "value": 'Aberration_P' },
        { "name": 'Extinction', "value": 'Extinction' },
        { "name": 'Valguero', "value": 'Valguero_P' },
        { "name": 'Genesis Part One', "value": 'Genesis' },
        { "name": 'Genesis Part Two', "value": 'Gen2' },
        { "name": 'Crystal Isles', "value": 'CrystalIsles' },
        { "name": 'Lost Island', "value": 'LostIsland' },
        { "name": 'Fjordur', "value": 'Fjordur'},
    )),

    run: async (client, interaction) => {

        const cluster = interaction.options.getString('cluster');
        const mapname = interaction.options.getString('mapname');
        
        let error = "This Server couldn't be found, it may be offline or doesn't exist."
        const NSFembed = new MessageEmbed()
            .setAuthor({ name: BotName, iconURL: BotIcon, url: BotNameLink })
            .setColor(PSEmbedColour)
            .setTimestamp()
            .addField(`Command Response Time: [0.${Math.floor(Date.now() - (interaction.createdTimestamp / 1000)) % 60}s]`, "To Report A Down Server [Click Me](http://ark.gg/outage)")
            .addField("\tError:", "```\n" +error+"```")  
        
        if(cluster === 'official') {
        
            let server = interaction.options.getNumber('serverorcluster').toString();
            let serverLength = server.length;
            let lengthToTake = serverLength+1; 
            let numbers = ["0","1","2","3","4","5","6","7","8","9","0"];
            let response = await fetch(psOfficials);
            let data = await response.json();
            
            for(i=0;i<data.length;i++){  
                if(data[i].SessionIsPve === 0 && data[i].ClusterId === "NewPS4PVPCrossArkCluster" ||data[i].ClusterId === "NewPS4PVECrossArkCluster"){
                    let serverName = data[i].Name.replace(/ - \(v\d+\.\d+\)$/, '');  
                        if(serverName.substring(serverName.length-serverLength,serverName.length) === server){
                            if(!numbers.includes(serverName.substring(serverName.length-lengthToTake,serverName.length-serverLength))){

                                let currentsearch = serverdb.get(serverName);
                                var newcurrentsearch = currentsearch + 1;
                                serverdb.set(serverName, newcurrentsearch);

        const Resultembed = new MessageEmbed()
            .setAuthor({ name: BotName, iconURL: BotIcon, url: BotNameLink })
            .setDescription(`ARK | PlayStation Official **[${server}]**\nServer has been Searched **[${newcurrentsearch}]** Times`)
            .setColor(PSEmbedColour)
            .setTimestamp()
            .addField(`Command Response Time: [0.${Math.floor(Date.now() - (interaction.createdTimestamp / 1000)) % 60}s]`, "Need help? [Support Discord](https://discord.gg/GwJKw7KP9J)")
            .addField("\tServer Name:", "```\n" +serverName+"```")
            .addField("\tPlayers:", "```\n" +data[i].NumPlayers+ "/" +data[i].MaxPlayers+ "```",true)          
            .addField("\tMap:", "```\n" +data[i].MapName+ "```",true)
            .addField("\tDay:", "```\n" +data[i].DayTime+ "```",true)   
            .addField("\tIP:", "```\n" +data[i].IP+ "```",true)
            .addField("\tPort:", "```\n" +data[i].Port+ "```",true) 
        return interaction.followUp({ embeds: [Resultembed] })
                                }
                        }
                    }
            } return interaction.followUp({ embeds: [NSFembed] })
        
        }
        
        if(cluster === 'smalltribes') {
         
    let server = interaction.options.getNumber('serverorcluster').toString();
    let serverLength = server.length;
    let lengthToTake = serverLength+1; 
    let numbers = ["0","1","2","3","4","5","6","7","8","9","0"];
    let response = await fetch(psOfficials);
    let data = await response.json();
    
    for(i=0;i<data.length;i++){  
        if(data[i].SessionIsPve === 0 && data[i].ClusterId === "PS4SmallTribesCrossArkCluster"){
            let serverName = data[i].Name.replace(/ - \(v\d+\.\d+\)$/, '');    
                if(serverName.substring(serverName.length-serverLength,serverName.length) === server){
                    if(!numbers.includes(serverName.substring(serverName.length-lengthToTake,serverName.length-serverLength))){

                        let currentsearch = serverdb.get(serverName);
                        var newcurrentsearch = currentsearch + 1;
                        serverdb.set(serverName, newcurrentsearch);

const Resultembed = new MessageEmbed()
    .setAuthor({ name: BotName, iconURL: BotIcon, url: BotNameLink })
    .setDescription(`ARK | PlayStation Small Tribes **[${server}]**\nServer has been Searched **[${newcurrentsearch}]** Times`)
    .setColor(PSEmbedColour)
    .setTimestamp()
    .addField(`Command Response Time: [0.${Math.floor(Date.now() - (interaction.createdTimestamp / 1000)) % 60}s]`, "Need help? [Support Discord](https://discord.gg/GwJKw7KP9J)")
    .addField("\tServer Name:", "```\n" +serverName+"```")
    .addField("\tPlayers:", "```\n" +data[i].NumPlayers+ "/" +data[i].MaxPlayers+ "```",true)          
    .addField("\tMap:", "```\n" +data[i].MapName+ "```",true)
    .addField("\tDay:", "```\n" +data[i].DayTime+ "```",true)   
    .addField("\tIP:", "```\n" +data[i].IP+ "```",true)
    .addField("\tPort:", "```\n" +data[i].Port+ "```",true) 
return interaction.followUp({ embeds: [Resultembed] })
                        }
                }
            }
    } return interaction.followUp({ embeds: [NSFembed] })

        }
        
        if(cluster === 'arkpocalypse') {

            let server = interaction.options.getNumber('serverorcluster').toString();
            let serverLength = server.length;
            let lengthToTake = serverLength+1; 
            let numbers = ["0","1","2","3","4","5","6","7","8","9","0"];
            let response = await fetch(psOfficials);
            let data = await response.json();
            
            for(i=0;i<data.length;i++){  
                if(data[i].SessionIsPve === 0 && data[i].ClusterId === "PS4ArkpocalypseCrossArkCluster"){
                    let serverName = data[i].Name.replace(/ - \(v\d+\.\d+\)$/, '');    
                        if(serverName.substring(serverName.length-serverLength,serverName.length) === server){
                            if(!numbers.includes(serverName.substring(serverName.length-lengthToTake,serverName.length-serverLength))){

                                let currentsearch = serverdb.get(serverName);
                                var newcurrentsearch = currentsearch + 1;
                                serverdb.set(serverName, newcurrentsearch);
        
        const Resultembed = new MessageEmbed()
            .setAuthor({ name: BotName, iconURL: BotIcon, url: BotNameLink })
            .setDescription(`ARK | PlayStation ARKpocalypse **[${server}]**\nServer has been Searched **[${newcurrentsearch}]** Times`)
            .setColor(PSEmbedColour)
            .setTimestamp()
            .addField(`Command Response Time: [0.${Math.floor(Date.now() - (interaction.createdTimestamp / 1000)) % 60}s]`, "Need help? [Support Discord](https://discord.gg/GwJKw7KP9J)")
            .addField("\tServer Name:", "```\n" +serverName+"```")
            .addField("\tPlayers:", "```\n" +data[i].NumPlayers+ "/" +data[i].MaxPlayers+ "```",true)          
            .addField("\tMap:", "```\n" +data[i].MapName+ "```",true)
            .addField("\tDay:", "```\n" +data[i].DayTime+ "```",true)   
            .addField("\tIP:", "```\n" +data[i].IP+ "```",true)
            .addField("\tPort:", "```\n" +data[i].Port+ "```",true) 
        return interaction.followUp({ embeds: [Resultembed] })
                            }
                        }
                    }
            } return interaction.followUp({ embeds: [NSFembed] })
            
        }
        
        if(cluster === 'crossark') {

    let clusternumber = interaction.options.getNumber('serverorcluster').toString();
    let map = interaction.options.getString('mapname');
    let serverLength = clusternumber.length;
    let lengthToTake = serverLength+1; 
    let numbers = ["0","1","2","3","4","5","6","7","8","9","0"];
    let response = await fetch(psOfficials);
    let data = await response.json();
    
    for(i=0;i<data.length;i++){  
        if(data[i].SessionIsPve === 0 && (data[i].ClusterId === `NewOfflineRaidProtectCrossArk${clusternumber}CrossArkCluster`|| data[i].ClusterId === `NewPVPCrossArk${clusternumber}CrossArkCluster` || data[i].ClusterId === `NewPVPNoTekCrossArk${clusternumber}CrossArkCluster` || data[i].ClusterId === `NewPS4PVPPrimPlusCrossArk${clusternumber}CrossArkCluster`)&& data[i].MapName === `${map}`){
            let serverName = data[i].Name.replace(/ - \(v\d+\.\d+\)$/, '');   
                if(serverName.substring(serverName.length-serverLength,serverName.length) === clusternumber){
                    if(!numbers.includes(serverName.substring(serverName.length-lengthToTake,serverName.length-serverLength))){

                        let currentsearch = serverdb.get(serverName);
                        var newcurrentsearch = currentsearch + 1;
                        serverdb.set(serverName, newcurrentsearch);

const Resultembed = new MessageEmbed()
    .setAuthor({ name: BotName, iconURL: BotIcon, url: BotNameLink })
    .setDescription(`ARK | PlayStation CrossArk **[${clusternumber} - ${map}]**\nServer has been Searched **[${newcurrentsearch}]** Times`)
    .setColor(PSEmbedColour)
    .setTimestamp()
    .addField(`Command Response Time: [0.${Math.floor(Date.now() - (interaction.createdTimestamp / 1000)) % 60}s]`, "Need help? [Support Discord](https://discord.gg/GwJKw7KP9J)")
    .addField("\tServer Name:", "```\n" +serverName+"```")
    .addField("\tPlayers:", "```\n" +data[i].NumPlayers+ "/" +data[i].MaxPlayers+ "```",true)          
    .addField("\tMap:", "```\n" +data[i].MapName+ "```",true)
    .addField("\tDay:", "```\n" +data[i].DayTime+ "```",true)   
    .addField("\tIP:", "```\n" +data[i].IP+ "```",true)
    .addField("\tPort:", "```\n" +data[i].Port+ "```",true) 
return interaction.followUp({ embeds: [Resultembed] })
                    }
                }
            }
    } return interaction.followUp({ embeds: [NSFembed] })
            
        }
        }
        }