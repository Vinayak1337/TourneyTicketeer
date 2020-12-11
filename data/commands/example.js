const Discord = require('discord.js');

module.exports.run = (Bot, msg, args) => {
return;
}
module.exports.help = {
    name: 'exammple',
    description: 'Command file template!',
    usage: 'usage of the command',
    module: '',
    aliases: []
    //command name identifier
}

module.exports.requirements = {
    userPerms: [],
    BotPerms: [],
    ownerOnly: true,
    adminOnly: false
    //Requirements
}

module.exports.userLimits ={
    rateLimit: Infinity,
    cooldown: 0 //time in ms
}

module.exports.serverLimits = {
    rateLimit: Infinity,
    cooldown: 0
}