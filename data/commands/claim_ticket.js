const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = (Bot, msg, args) => {
    if (!msg.guild.id === '656205189757534276') return;
    const data = JSON.parse(fs.readFileSync('./data/database/valiantPayments.csv','utf8'));
    if (!Bot.guilds.cache.get('656205189757534276').channels.cache.find(ch => ch.name.startsWith(msg.author.id))) return msg.channel.send(`You haven't created any ticket yet or it is deleted. ${data.payments_open?`Please type $create to create a ticket if you have won in between ${Bot.channels.cache.get(data.category).name.replace('Payments','')}`:`There's no payment window open.`}`);
    if (Bot.guilds.cache.get('656205189757534276').channels.cache.find(ch => ch.name.startsWith(msg.author.id)).name.endsWith('claimed')) return msg.channel.send(`Your ticket has already been claimed ${Bot.guilds.cache.get('656205189757534276').channels.cache.find(ch => ch.name.startsWith(msg.author.id)).toString()}`);
    const channel = Bot.guilds.cache.get('656205189757534276').channels.cache.find(ch => ch.name.startsWith(msg.author.id));
    channel.edit({name: channel.name + '-claimed'});
    channel.updateOverwrite(msg.author, {
        SEND_MESSAGES: false
      });
    return Bot.emit('updateTicket',msg.author,channel,channel.parent.name.replace('Payments',''),'Claimed ticket');
}
module.exports.help = {
    name: 'claim',
    description: 'Command file template!',
    usage: 'usage of the command',
    module: '',
    aliases: []
}

module.exports.requirements = {
    userPerms: [],
    BotPerms: [],
    ownerOnly: false,
    adminOnly: false
}