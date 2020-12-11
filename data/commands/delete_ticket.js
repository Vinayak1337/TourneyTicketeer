const Discord = require('discord.js');

module.exports.run = (Bot, msg, args) => {
    if (!msg.guild.id === '656205189757534276') return;
    if (!Bot.guilds.cache.get('656205189757534276').channels.cache.find(ch => ch.name.startsWith(msg.author.id))) return msg.channel.send(`You haven't created any ticket yet or it is deleted.`);
    const channel = Bot.guilds.cache.get('656205189757534276').channels.cache.find(ch => ch.name.startsWith(msg.author.id));
    msg.channel.send('Your ticket will be deleted in 7 Seconds');
    setTimeout(function(){
        channel.delete();
    },7000);
    Bot.emit('deleteTicket',msg.author,'Deleted by ticket author');
    return msg.author.send('Your ticket has been successfully deleted.');
}
module.exports.help = {
    name: 'delete',
    description: 'Command file template!',
    usage: 'usage of the command',
    module: '',
    aliases: []
    //command name identifier
}

module.exports.requirements = {
    userPerms: [],
    BotPerms: [],
    ownerOnly: false,
    adminOnly: false
    //Requirements
}