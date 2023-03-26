const xboxOfficials = "http://arkdedicated.com/xbox/cache/officialserverlist.json";
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { BotIcon, BotName, BotNameLink, XBOXEmbedColour } = require('./../Database/Information.json');
const { JsonDatabase } = require("wio.db");
const serverdb = new JsonDatabase({ databasePath:"./Database/Servers.json" });
module.exports = {
    name:"xboxofficial",
    data: new SlashCommandBuilder()
    .setName("xboxofficial")
    .setDescription("Lookup Xbox Official Server Information.")
    .addStringOption(option => option.setName('cluster').setDescription('Choose your Server Cluster').setRequired(true)
    .addChoices(
        {"name": "Official", "value": "official"},
        {"name": "SmallTribes", "value": "smalltribes"},
        {"name": "ARKpocalypse", "value": "arkpocalypse"},
        {"name": "CrossARK", "value": "crossark"},
        {"name": "CrossPlay", "value": "crossplay"},
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
            .setColor(XBOXEmbedColour)
            .setTimestamp()
            .addField(`Command Response Time: [0.${Math.floor(Date.now() - (interaction.createdTimestamp / 1000)) % 60}s]`, "To Report A Down Server [Click Me](http://ark.gg/outage)")
            .addField("\tError:", "```\n" +error+"```")  
        
        if(cluster === 'official') {
        
            let server = interaction.options.getNumber('serverorcluster').toString();
            let serverLength = server.length;
            let lengthToTake = serverLength+1; 
            let numbers = ["0","1","2","3","4","5","6","7","8","9","0"];
            let response = await fetch(xboxOfficials);
            let data = await response.json();
            
            for(i=0;i<data.length;i++){  
                if(data[i].SessionIsPve === 0 && data[i].ClusterId === "NewXboxPVP"){
                    let serverName = data[i].Name;
                        if(serverName.substring(serverName.length-serverLength,serverName.length) === server){
                            if(!numbers.includes(serverName.substring(serverName.length-lengthToTake,serverName.length-serverLength))){

                                let currentsearch = serverdb.get(serverName);
                                var newcurrentsearch = currentsearch + 1;
                                serverdb.set(serverName, newcurrentsearch);
        
        const Resultembed = new MessageEmbed()
            .setAuthor({ name: BotName, iconURL: BotIcon, url: BotNameLink })
            .setDescription(`ARK | Xbox Official **[${server}]**\nServer has been Searched **[${newcurrentsearch}]** Times`)
            .setColor(XBOXEmbedColour)
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
    let response = await fetch(xboxOfficials);
    let data = await response.json();
    
    for(i=0;i<data.length;i++){  
        if(data[i].SessionIsPve === 0 && data[i].ClusterId === "XboxSmallTribes"){
            let serverName = data[i].Name;
                if(serverName.substring(serverName.length-serverLength,serverName.length) === server){
                    if(!numbers.includes(serverName.substring(serverName.length-lengthToTake,serverName.length-serverLength))){

                        let currentsearch = serverdb.get(serverName);
                        var newcurrentsearch = currentsearch + 1;
                        serverdb.set(serverName, newcurrentsearch);

const Resultembed = new MessageEmbed()
    .setAuthor({ name: BotName, iconURL: BotIcon, url: BotNameLink })
    .setDescription(`ARK | Xbox Small Tribes **[${server}]**\nServer has been Searched **[${newcurrentsearch}]** Times`)
    .setColor(XBOXEmbedColour)
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
            let response = await fetch(xboxOfficials);
            let data = await response.json();
            
            for(i=0;i<data.length;i++){  
                if(data[i].SessionIsPve === 0 && data[i].ClusterId === "XboxArkpocalypse"){
                    let serverName = data[i].Name;
                        if(serverName.substring(serverName.length-serverLength,serverName.length) === server){
                            if(!numbers.includes(serverName.substring(serverName.length-lengthToTake,serverName.length-serverLength))){

                                let currentsearch = serverdb.get(serverName);
                                var newcurrentsearch = currentsearch + 1;
                                serverdb.set(serverName, newcurrentsearch);
        
        const Resultembed = new MessageEmbed()
            .setAuthor({ name: BotName, iconURL: BotIcon, url: BotNameLink })
            .setDescription(`ARK | Xbox ARKpocalypse **[${server}]**\nServer has been Searched **[${newcurrentsearch}]** Times`)
            .setColor(XBOXEmbedColour)
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
    let response = await fetch(xboxOfficials);
    let data = await response.json();
    
    for(i=0;i<data.length;i++){  
        if(data[i].SessionIsPve === 0 && (data[i].ClusterId === `NewPVPCrossArk${clusternumber}`|| data[i].ClusterId === `PrimPCrossArk${clusternumber}` || data[i].ClusterId === `NewORPCrossArk${clusternumber}` )&& data[i].MapName === `${map}`){
            let serverName = data[i].Name;
                if(serverName.substring(serverName.length-serverLength,serverName.length) === clusternumber){
                    if(!numbers.includes(serverName.substring(serverName.length-lengthToTake,serverName.length-serverLength))){

                        let currentsearch = serverdb.get(serverName);
                        var newcurrentsearch = currentsearch + 1;
                        serverdb.set(serverName, newcurrentsearch);

const Resultembed = new MessageEmbed()
    .setAuthor({ name: BotName, iconURL: BotIcon, url: BotNameLink })
    .setDescription(`ARK | Xbox CrossArk **[${clusternumber} - ${map}]**\nServer has been Searched **[${newcurrentsearch}]** Times`)
    .setColor(XBOXEmbedColour)
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
        
        if(cluster === 'crossplay') {
    
    let server = interaction.options.getNumber('serverorcluster').toString();
    let serverLength = server.length;
    let lengthToTake = serverLength+1; 
    let numbers = ["0","1","2","3","4","5","6","7","8","9","0"];
    let response = await fetch(xboxOfficials);
    let data = await response.json();
    
    for(i=0;i<data.length;i++){  
        if(data[i].SessionIsPve === 0 && (data[i].ClusterId === `CrossPlayNAPVP` || data[i].ClusterId === `CrossPlayEUPVP` || data[i].ClusterId === `CrossPlayOCPVP`)){
            let serverName = data[i].Name;
                if(serverName.substring(serverName.length-serverLength,serverName.length) === server){
                    if(!numbers.includes(serverName.substring(serverName.length-lengthToTake,serverName.length-serverLength))){

                        let currentsearch = serverdb.get(serverName);
                        var newcurrentsearch = currentsearch + 1;
                        serverdb.set(serverName, newcurrentsearch);

const Resultembed = new MessageEmbed()
    .setAuthor({ name: BotName, iconURL: BotIcon, url: BotNameLink })
    .setDescription(`ARK | Xbox Crossplay **[${server}]**\nServer has been Searched **[${newcurrentsearch}]** Times`)
    .setColor(XBOXEmbedColour)
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