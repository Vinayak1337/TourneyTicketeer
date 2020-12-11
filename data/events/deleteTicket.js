const Discord = require("discord.js")

module.exports = (Bot,author,reason) => {
Bot.channels.cache.get('734745040647094473').send(new Discord.MessageEmbed()
.setColor('RED')
.setTitle('Deleted ticket')
.setThumbnail(author.displayAvatarURL({dynamic: true}))
.addField('User Info',`ID: ${author.id}\nTag: ${author.tag}\nReason: ${reason}`)
);
}