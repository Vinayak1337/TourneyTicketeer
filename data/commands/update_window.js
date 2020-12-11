const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = (Bot, msg, args) => {

    const data = JSON.parse(fs.readFileSync('./data/database/valiantPayments.csv','utf8'));
    if(!args[0]){
        msg.channel.send('$ticket open/close/paid/update category-id[If update]');

    } else if (args[0].toLowerCase() === 'open'){
        data.payments_open = true;
        fs.writeFileSync('./data/database/valiantPayments.csv',JSON.stringify(data), (err) => {
            if(err) {
                console.log(err);
                return msg.channel.send('Error while saving file: '+err.message);
            }
        });
        msg.channel.send('Done!');
    }else if (args[0].toLowerCase() === 'close'){
        data.payments_open = false;
        fs.writeFileSync('./data/database/valiantPayments.csv',JSON.stringify(data), (err) => {
            if(err) {
                console.log(err);
                return msg.channel.send('Error while saving file: '+err.message);
            }
        });
        msg.channel.send('Done!');
    }else if (args[0].toLowerCase() === 'update'){
        if (!args[1]) return msg.channel.send('Provide category ID');
        if (!Bot.channels.cache.get(args[1])) return msg.channel.send(`Didn't find any channel with given ID ${args[1]}`);
        if (!Bot.channel.cache.get(args[1]).type === 'category') return msg.channel.send(`It is not a category`);
        data.category = args[1];
        fs.writeFileSync('./data/database/valiantPayments.csv',JSON.stringify(data), (err) => {
            if(err) {
                console.log(err);
                return msg.channel.send('Error while saving file: '+err.message);
            }
        });
        msg.channel.send('Done!');
    } else if (args[0].toLowerCase() === 'paid') {
        if (Bot.users.cache.get(msg.channel.name.replace('-claimed',''))) {
            Bot.users.cache.get(msg.channel.name.replace('-claimed','')).send('You have been paid!\n-Valiant');
            msg.channel.send('Channel will be deleted in 7 Seconds');
            setTimeout(function(){
                msg.channel.delete();
            },7000);
        } else {
            msg.channel.send(`Could not find any user with ID ${msg.channel.name.replace('-claimed','')}`)
        }
    }
}
module.exports.help = {
    name: 'ticketw',
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