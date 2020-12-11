const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = (Bot, msg, args) => {
    let channels = msg.mentions.channels.map(ch => ch);
    let iDs = [];
    channels.forEach(ch => {
        iDs.push(ch.id);
    });
    let data = JSON.parse(fs.readFileSync('./data/database/channels.csv','utf8'));
    data[msg.guild.id] = {
        channels: iDs
    }
    fs.writeFileSync('./data/database/channels.csv',JSON.stringify(data),(err) => {
        if(err){
            return msg.channel.send(Bot.errEm.setDescription(`Encounterd an error:\`\`\`js\n${err.name}: ${err.message}\n\`\`\`\nPlease report it to our ${Bot.support} asap.`));
        }
    })
    return msg.channel.send(Bot.errEm.setDescription(`Alright, now i will only respond in these channels: ${channels.join(' ')}.`));
}
module.exports.help = {
    name: 'setchannels',
    description: 'Restrict the bot in specific channels.',
    usage: 'setchannels #mention_channels',
    module: '',
    aliases: ['setchannel','setch']
}

module.exports.requirements = {
    userPerms: ['MANAGE_GUILD'],
    BotPerms: ['MANAGE_GUILD','MANAGE_CHANNELS'],
    ownerOnly: false,
    adminOnly: true
}