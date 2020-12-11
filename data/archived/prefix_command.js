const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = (Bot, msg, args) => {
    if(!args[0]){
        return msg.channel.send(Bot.sucEm.setDescription(`This server's prefix is **${Bot.prefix}**.\n\nTo change server prefix type: ${Bot.prefix}prefix *your_prefix*`));
    }else{
      let prefixes =  JSON.parse(fs.readFileSync('./data/database/serverPrefixes.csv','utf8'));
      prefixes[msg.guild.id].prefix = args[0];
      fs.writeFileSync('./data/database/serverPrefixes.csv',JSON.stringify(prefixes), (err) => {
          if(err){
              console.log(err);
              return msg.channel.send(Bot.errEm.setDescription(`Encountered an error:\`\`\`js\n${err.message}\n\`\`\`\n If this happen again then report to our ${Bot.support}`));
          }
      })
      return msg.channel.send(Bot.sucEm.setDescription(`The prefix has been changed from **${Bot.prefix}** to **${args[0]}**`));
    }
}
module.exports.help = {
    name: 'prefix',
    description: 'Check the bot\'s prefix or change the bot\'s prefix.',
    usage: 'prefix *your_prefix*',
    module: 'Utility',
    aliases: ['p']
}

module.exports.requirements = {
    userPerms: ['MANAGE_GUILD'],
    BotPerms: [],
    ownerOnly: false,
    adminOnly: true
}
