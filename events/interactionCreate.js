const { JsonDatabase } = require("wio.db");
const uudb = new JsonDatabase({ databasePath:"./Database/CommandsUsedLeaderboard.json" });
const cudb = new JsonDatabase({ databasePath:"./Database/CommandsUsed.json" });

module.exports = {
    run: async (client, interaction) => {

        if(interaction.isSelectMenu()) {

    }
    if (!interaction.isCommand()) return;
    await interaction.deferReply().catch(err => {})

    let currentuserused = uudb.get(interaction.user.id);
    var newcurrentuserused = currentuserused + 1;
    uudb.set(interaction.user.id, newcurrentuserused);

    let current = cudb.get("commandsused");
    var newcurrent = current + 1;
    cudb.set("commandsused", newcurrent);

    const { commandName } = interaction;
    const command = client.slash_commands.get(commandName)
    if(!command) return interaction.followUp("Unknown Command: Can not find this command in bot.")

    try {
        if(command) await command.run(client, interaction)
    } catch (err) {
        console.log(err)
        return interaction.followUp(`Something went wrong while executing the command.`)
    }
}
}