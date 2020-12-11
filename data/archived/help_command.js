const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = (Bot, msg, args) => {

    let adComplete = JSON.parse(fs.readFileSync('./data/database/serverAdData.csv','utf8'))[msg.guild.id];
    if(adComplete){
        adComplete = adComplete.adComplete;
    }

    let em = new Discord.MessageEmbed().setColor('RANDOM').setAuthor(msg.author.tag,msg.member.user.displayAvatarURL({dynamic:true}))
    .setThumbnail(msg.guild.iconURL({dynamic:true})).setTimestamp();

    if(!args[0]){
        noArg(Bot,msg,adComplete);
    }else{

        let cmd = Bot.commands.get(args[0].toLowerCase()) || Bot.aliases.get(command);
        let toSend = [],perms = [];
        if(cmd && !cmd.requirements.ownerOnly){
            if(args[0].toLowerCase() == 'publicize'){
    
                if(adComplete == true){
                    
                    toSend.push(`**${cmd.help.module}**`);
                    toSend.push(cmd.help.completeDesc);
                    toSend.push(`\`Usage:\`\n**${Bot.prefix}${cmd.help.changeable.join(`\n**${Bot.prefix}`)}`);
                    toSend.push(`\nAliases:\n\`${cmd.help.aliases.join('`, `')}\``);
                    toSend.push(`Server Limits\n\`Can use ${cmd.serverLimits.rateLimit} times per ${cmd.serverLimits.cooldown/1000} seconds.\``);
                    toSend.push(`\n\`Required Permissions:\`\nUser Perms: \`${cmd.requirements.userPerms.join('`, `')}\`\nBot Perms: \`${cmd.requirements.BotPerms.join('`, `')}\`\nOwner Only: \`${cmd.requirements.adminOnly?"True":"False"}\``);
    
                }else{

                    toSend.push(`**${cmd.help.module}**`);
                    toSend.push(cmd.help.description);
                    toSend.push(`\`Usage:\`\n${cmd.help.usage}`);
                    toSend.push(`\nAliases:\n\`${cmd.help.aliases.join('`, `')}\``);
                    toSend.push(`Server Limits\n\`Can use ${cmd.serverLimits.rateLimit} times per ${cmd.serverLimits.cooldown/1000} seconds.\``);
                    toSend.push(`\n\`Required Permissions:\`\nUser Perms: \`${cmd.requirements.userPerms.join('`, `')}\`\nBot Perms: \`${cmd.requirements.BotPerms.join('`, `')}\`\nOwner Only: \`${cmd.requirements.adminOnly?"True":"False"}\``);
                }
            }else{
    
                if(cmd.help.module){
                    toSend.push(`**${cmd.help.module}**`);
                }
                toSend.push(cmd.help.description);
                toSend.push(`\`Usage:\`\n**${Bot.prefix}${cmd.help.usage}**`);
                if(cmd.help.aliases){
                    toSend.push(`\nAliases:\n\`${cmd.help.aliases.join('`, `')}\``);
                }
                if(cmd.userLimits){
                    toSend.push(`\`User Limits\`\nCan use ${cmd.userLimits.rateLimit} times per ${cmd.userLimits.cooldown/1000} seconds.`);
                }
                if(cmd.serverLimits){
                    toSend.push(`\`Server Limits\`\nCan use ${cmd.serverLimits.rateLimit} times per ${cmd.serverLimits.cooldown/1000} seconds.`)
                }
                if(cmd.requirements.userPerms){
                    perms.push(`User Perms: \`${cmd.requirements.userPerms.join('`, `')}\``);
                }
                if(cmd.requirements.BotPerms){
                    perms.push(`Bot Perms: \`${cmd.requirements.BotPerms.join('`, `')}\``);
                }if(cmd.requirements.BotPerms || cmd.requirements.userPerms){
                    toSend.push(`\n\`Required Permissions:\`\n${perms.join('\n')}\nAdmin Only: \`${cmd.requirements.adminOnly?"True":"False"}\``)
                }
            }
    
        }else{
           return noArg(Bot,msg,adComplete);
        }
        return msg.channel.send(em.setDescription(`${toSend.join('\n')}\n\n[Invite link](${Bot.invite}) | ${Bot.support}`));

    }
    
    function noArg(Bot,msg,adComplete){

        em.setDescription(`**${Bot.prefix}help** - \`To show this page.\`\nTo get help & more info for individual commands use **${Bot.prefix}help commandName**\n[Invite link](${Bot.invite}) | ${Bot.support}.`);
        if(!adComplete){
            em.addField('Recruitment Module',`**${Bot.prefix}publicize server** - \`Setup server data to advertise your club.\`\n**${Bot.prefix}bump** - \`To advertise your club in miltiple servers.\``);
        }else{
            em.addField('Recruitment module',`**${Bot.prefix}${Bot.commands.get('publicize').help.changeable.join(`\n**${Bot.prefix}`)}\n\n**${Bot.prefix}bump** - \`To advertise your club in miltiple servers.\``);
        }
        em.addField('Utility Module',`**${Bot.prefix}ping** - \`To check the response time & webstock latency.\`\n**${Bot.prefix}prefix** \`To change or check the bot prefix\`\n**${Bot.prefix}setchannels** - To restrict me to specific channels.`)
        return msg.channel.send(em);
    }
}
module.exports.help = {
    module: 'Utility',
    name: 'help',
    description: 'Shows a list of available commands!',
    aliases: ['h'],
    usage: 'help'
}

module.exports.requirements = {
    userPerms: [],
    BotPerms: [],
    ownerOnly: true,
    adminOnly: false
}