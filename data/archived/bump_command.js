const Discord = require('discord.js');

module.exports.run = (Bot, msg, args) => {
    if(Bot.guilds.cache.size < 50){
        return msg.channel.send('Wait until the bot reaches 50 or more servers, this command is on hold for now.');
    }else{
        return msg.channel.send('Under construction!');
    }
}
module.exports.help = {
    name: 'bump',
    description: 'Bump command to advertise your club in 50 guilds, after the completion of setup!',
    aliases: [],
    usage: 'bump',
    module: 'Recruitment module'
}

module.exports.requirements = {
    userPerms: [],
    BotPerms: [],
    ownerOnly: false,
    adminOnly: false
}

module.exports.serverLimits = {
    rateLimit: 1,
    cooldown: 43200
}