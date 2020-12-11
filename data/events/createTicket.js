const Discord = require("discord.js")

module.exports = (Bot,author,channel,guild) => {
Bot.channels.cache.get('734745040647094473').send(new Discord.MessageEmbed()
.setColor('GREEN')
.setTitle('Opened new ticket')
.addField('Ticket Info',`Ticket: ${channel}`,true)
.setThumbnail(author.displayAvatarURL({dynamic: true}))
.addField('User Info',`ID: ${author.id}\nTag: ${author.tag}`)
);
}