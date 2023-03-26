module.exports = {
    run: (client) => {
        console.log(`\n${client.user.username} is now online, connected to ${client.guilds.cache.size} Servers!`);
    }
}