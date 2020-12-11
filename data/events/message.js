const { owners } = require('../keys/settings');
const fs = require('fs');

module.exports = (Bot, msg) => {
    if(!Bot.botReady == true) return;
    if(msg.author == Bot.user) return;
    

    //Returning from DM
    if(msg.channel.type == 'dm') return console.log(msg.content+' :DMed\n By'+msg.author.tag);
    const chData = JSON.parse(fs.readFileSync('./data/database/channels.csv','utf8'))[msg.channel.id];
    if(chData && chData.channels){
        if(!chData.channels.includes(msg.channel.id)){
            return;
        }
    }
    //________________________________________________________________________________________
    //Get the prefix

    // let prefix, command, args;
    // let prefixes = JSON.parse(fs.readFileSync('./data/database/serverPrefixes.csv','utf8'));
    // if(!prefixes[msg.guild.id]){
    //     prefixes[msg.guild.id] = {
    //         prefix: Bot.settings.tag
    //     }
    //     prefix = prefixes[msg.guild.id].prefix;
    // }
    // else if(!prefixes[msg.guild.id].prefix){
    //     prefixes[msg.guild.id].prefix = Bot.settings.tag;
    //     prefix = prefixes[msg.guild.id].prefix;
    // }
    // else{
    //     prefix = prefixes[msg.guild.id].prefix;
    // }
    // fs.writeFileSync('./data/database/serverPrefixes.csv', JSON.stringify(prefixes), (err) => {
    //     if(err){
    //         console.log(err);
    //     }
    // })
    const prefix = '$';
    Bot.prefix = prefix;

    //___________________________________________________________________________________________
    //Returning here if not prefix
    if(!msg.content.startsWith(prefix) && !msg.content.startsWith('<@!714763717874679871>') && !msg.content.startsWith('<@714763717874679871>')) return;
    //Returning if Bot
    if(msg.author.bot) return;

    let msgArray = msg.content.split(' ');

    if(msg.content.startsWith('<@!714763717874679871>')){

        command = msgArray[1].toLowerCase();
        args = msgArray.slice(2);

    }
    else{

        command = msgArray[0].slice(prefix.length).toLowerCase();
        args = msgArray.slice(1);
    }
    args.forEach((a,i) => {
        a = a.trim();
        if(!a){args.splice(i,1)}});
        args = args.map(a => a.trim());

    const cmd = Bot.commands.get(command) || Bot.aliases.get(command);
    Bot.command = command;

    if(!cmd) return;
    if(!msg.guild.me.permissions.has(['SEND_MESSAGES'])) return msg.author.send(Bot.errEm.setDescription(`user ${msg.author}, i don't have permission to send message in ${msg.channel}`));

    if(cmd.requirements.ownerOnly && !owners.includes(msg.author.id)) return;
    if(cmd.requirements.adminOnly && !msg.member.permissions.has(['ADMINISTRATOR'])) return msg.channel.send(Bot.errEm.setDescription('This command requires admin permission'));

    if(cmd.requirements.userPerms && !msg.member.permissions.has(cmd.requirements.userPerms)){
        return msg.channel.send(Bot.errEm.setDescription(`You must have the following permissions: ${missingPerms(msg.member, cmd.requirements.userPerms)}`));
    }

    if(cmd.requirements.BotPerms && !msg.guild.me.permissions.has(cmd.requirements.BotPerms)){
        return msg.channel.send(Bot.errEm.setDescription(`I am missing the following permissions: ${missingPerms(msg.guild.me, cmd.requirements.BotPerms)}`));
    }
    
    //Check user limit
    if(cmd.userLimits){
        const current = Bot.limits.get(`${command}-${msg.author.id}`);

        if(!current){
            let obj = {};
             obj.crr = 1;
             obj.time = Date.now()/1000;
            Bot.limits.set(`${command}-${msg.author.id}`, obj);

        }else{

         if(current.crr >= cmd.userLimits.rateLimit){
             const usedTime = current.time;
             const time = Date.now()/1000;
             const used = time - usedTime;
             const remain = cmd.limits.cooldown/1000 - used;
            return msg.channel.send(Bot.errEm.setDescription(`Please wait ${Math.round(remain)} seconds to use this command again!`));

         }else{
             let obj = {};
             obj.crr = current.crr + 1;
             obj.time = Date.now()/1000;
             Bot.limits.set(`${command}-${msg.author.id}`,obj);
         }
        }

        setTimeout(() => {
            Bot.limits.delete(`${command}-${msg.author.id}`);
            Bot.limits.delete(`${command}-${msg.author.id}-Time`);
        },cmd.userLimits.cooldown);
    }

    //check if server limits
    else if(cmd.serverLimits){
        const current = Bot.limits.get(`${command}-${msg.guild.id}`);

        if(!current){
            let obj = {};
             obj.crr = 1;
             obj.time = Date.now()/1000;
            Bot.limits.set(`${command}-${msg.guild.id}`, obj);

        }else{

         if(current.crr >= cmd.serverLimits.rateLimit){
             const usedTime = current.time;
             const time = Date.now()/1000;
             const used = time - usedTime;
             const remain = cmd.limits.cooldown/1000 - used;
            return msg.channel.send(Bot.errEm.setDescription(`Please wait ${Math.round(remain)} seconds to use this command again!`));

         }else{
             let obj = {};
             obj.crr = current.crr + 1;
             obj.time = Date.now()/1000;
             Bot.limits.set(`${command}-${msg.guild.id}`,obj);
         }
        }

        setTimeout(() => {
            Bot.limits.delete(`${command}-${msg.guild.id}`);
            Bot.limits.delete(`${command}-${msg.guild.id}-Time`);
        },cmd.serverLimits.cooldown);
    }

    cmd.run(Bot, msg, args, command);
}

const missingPerms = (member, perms) => {
    const missingPerms = member.permissions.missing(perms)
    .map(str => `\`${str.replace(/_/g, ' ').toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())}\``);

    return missingPerms.length > 1 ?
    `${missingPerms.slice(0, -1).join(', ')} and ${missingPerms.slice(-1[0])}`:
    missingPerms[0];
}