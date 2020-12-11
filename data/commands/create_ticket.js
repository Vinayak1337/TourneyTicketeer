const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = (Bot, msg, args) => {
    if (!msg.guild.id === '656205189757534276') return;
    if (!msg.member.roles.cache.has('759732551697956865')) return msg.channel.send('Go to <#656465426980667412> and grab Pyament Announcement role first then try this command again.');
    if (msg.member.roles.cache.has('778242819705798708') || msg.member.roles.cache.has('777877448293351454')) return msg.channel.send('Valiant Pass users are not allowed to create ticket, DM Vinayak / Siris for more info.');
    if (Bot.guilds.cache.get('656205189757534276').channels.cache.find(ch => ch.name.startsWith(msg.author.id))) return msg.channel.send(`Your ticket already exist ${Bot.guilds.cache.get('656205189757534276').channels.cache.find(ch => ch.name.startsWith(msg.author.id)).toString()}`);
    const data = JSON.parse(fs.readFileSync('./data/database/valiantPayments.csv','utf8'));
    if (!data.payments_open) return msg.channel.send(`Payments window hasn't open yet!`);
    const category = Bot.channels.cache.get(data.category);
    (async () => {
        const channel = await msg.guild.channels.create(msg.author.id,{
            parent: category,
            type: 'text',
            topic: `ID: ${msg.author.id}\nTag: ${msg.author.tag}`,
            permissionOverwrites: [
                {
                    id: '656205189757534276',
                    deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'ATTACH_FILES', 'EMBED_LINKS']
                }
            ]
        });
        channel.updateOverwrite(msg.author, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            READ_MESSAGE_HISTORY: true,
            ATTACH_FILES: true,
            EMBED_LINKS: true
          });
        Bot.emit('createTicket',msg.author,channel);
        channel.send(`Hi ${msg.author}, Are you trying to create ticket of the ${category.name} ?\n(yes/no)\nIf you fail to respond on time then your ticket will be deleted.`);
        msg.channel.send(channel.toString());
        getBool();
        function getBool(){
            channel.awaitMessages(m => m.content.length > 0 && m.author.id == msg.author.id, {max: 1, time:120000, errors: ['time']}).then(collected => {
                if (!['yes','no','y','n'].some(n => collected.first().content.toLowerCase() === n)) {
                    channel.send(`Incorrect\nPlease type yes or no to reply.`);
                    return getBool();
                }else if (['yes','y'].some(n => collected.first().content.toLowerCase() === n)){
                    nextStep();
                }else {
                    channel.delete();
                    msg.author.send(`Payments are only open for ${category.name.replace('Payments','')}. If you're trying to create ticket of further dates then wait for the announcement once we open payment for further dates.\nIf you're trying to create ticket of previous dates than mentioned then you have forfeited your payment.`);
                    return Bot.emit('deleteTicket',msg.author,'Trying to create ticket of different dates than '+category.name.replace('Payments',''));
                }
            }).catch(err => {if (err.map){channel.delete(); Bot.emit('deleteTicket',msg.author,'Failed to respond on time while confirming payment date.'); return msg.author.send('You failed to respond on time, your ticket has been deleted.')}else{ channel.send(`Error: ${err.message}`)}});
        }
        function nextStep() {
        channel.send(`What is your payment mode?\n1. PayTM\n2. Google Pay\n3. UPI\n4. GPGC (Google Play Gift Card) Code\n\nType 1,2,3 or 4 to choose your payment method.\nIf you fail to respond on time then your ticket will be deleted.`);
        getMethod();
        function getMethod(){
            channel.awaitMessages(m => m.content.length > 0 && m.author.id == msg.author.id, {max: 1, time:120000, errors: ['time']}).then(collected => {
                if (!['1','2','3','4'].some(n => collected.first().content === n)) {
                    channel.send(`Incorrect\nPlease type 1,2,3 or 4 to choose your payment method!`);
                    return getMethod();
                }
                switch(collected.first().content) {
                    case '1': {
                        channel.messages.cache.forEach(message => {message.delete()});
                        channel.setParent(data.paytm, { lockPermissions: false });
                        Bot.emit('updateTicket',msg.author,channel,'paytm','Payment mode set');
                        channel.send(`Hey ${msg.author}, **Please provide following details**\n\n- Screenshot of your winnings from <#737680606527488001>\n\n-Screenshot of your paytm qr code\nTo find this QR Code on your Paytm app go to My Profile.\n\n-Total amount to pay.\n\nFail to send the 1st or 2nd detail can cancel your payment.\nOnce you send all the details then type $claim to claim your ticket, it specifies that you have sent all the required details and you're ready to take payment.`);

                    }break;

                    case '2': {
                        channel.messages.cache.forEach(message => {message.delete()});
                        channel.setParent(data.gpay, { lockPermissions: false });
                        Bot.emit('updateTicket',msg.author,channel,'gpay','Payment mode set');
                        channel.send(`Hey ${msg.author}, \nNote:- There is 1% tax of PayTM itself for transferring money from wallet to bank which will be deducted from your payment\n**Please provide following details**\n\n- Screenshot of your winnings from <#737680606527488001>\n\n-Screenshot of your Google Play qr or spot code\nTo find qr / spot code, please google it.\n\n-Total amount to pay.\n\nFail to send the 1st or 2nd detail can cancel your payment.\nOnce you send all the details then type $claim to claim your ticket, it specifies that you have sent all the required details and you're ready to take payment.`);

                    }break;

                    case '3': {
                        channel.messages.cache.forEach(message => {message.delete()});
                        channel.setParent(data.upi, { lockPermissions: false });
                        Bot.emit('updateTicket',msg.author,channel,'upi id','Payment mode set');
                        channel.send(`Hey ${msg.author}, \nNote:- There is 1% tax of PayTM itself for transferring money from wallet to bank which will be deducted from your payment\n**Please provide following details**\n\n- Screenshot of your winnings from <#737680606527488001>\n\n-Screenshot of your UPI ID QR Code or Just type your UPI ID\n\n-Total amount to pay.\n\nFail to send the 1st or 2nd detail can cancel your payment.\nOnce you send all the details then type $claim to claim your ticket, it specifies that you have sent all the required details and you're ready to take payment.`);

                    }break;

                    case '4': {
                        channel.messages.cache.forEach(message => {message.delete()});
                        channel.setParent(data.gpgc, { lockPermissions: false });
                        Bot.emit('updateTicket',msg.author,channel,'gpgc','Payment mode set');
                        channel.send(`Hey ${msg.author}, **Please provide following details**\n\n- Screenshot of your winnings from <#737680606527488001>\n\n-Total amount to pay.\n\nFail to send the 1st detail can cancel your payment.\nOnce you send all the details then type $claim to claim your ticket, it specifies that you have sent all the required details and you're ready to take payment.`);
                    }break;

                    default: {
                        channel.send('Something went wrong, try to contact Vinayak#0001');
                    }break;
                }
            }).catch(err => {if (err.map){channel.delete(); Bot.emit('deleteTicket',msg.author,'Failed to respond on time while choosing payment method.'); return msg.author.send('You failed to respond on time, your ticket has been deleted.')}else{ channel.send(`Error: ${err.message}`)}});
        }
    }
    })();
}
module.exports.help = {
    name: 'create',
    description: 'Command file template!',
    usage: 'usage of the command',
    module: '',
    aliases: ['createticket']
    //command name identifier
}

module.exports.requirements = {
    userPerms: [],
    BotPerms: [],
    ownerOnly: false,
    adminOnly: false
    //Requirements
}