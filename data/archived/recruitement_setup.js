const Discord = require('discord.js');
const fs = require('fs');
const fetch = require('node-fetch');
const brawlAPI = require('../functionsBS/brawlAPI');
const brawlEmotesFinder = require('../functionsBS/brawlEmotes');
const trophyEmotesFinder = require('../functionsBS/trophyEmotes');
const clubEmoteFinder = require('../functionsBS/clubIcon');
const imageChecker = require('is-image-url');

module.exports.run = (Bot, msg, args) => {

    const running = Bot.runningCommand.get(`${msg.guild.id}-publicize`);
    if(running){
        return msg.channel.send(Bot.errEm.setDescription(`This command is already running in this server.`));
    }else{
        Bot.runningCommand.set(`${msg.guild.id}-publicize`,true);
    }

    let dataCheck = JSON.parse(fs.readFileSync('./data/database/serverAdData.csv','utf8'));
    let emotes = JSON.parse(fs.readFileSync('./data/database/emojis.csv','utf8'));
    const errEmbed = new Discord.MessageEmbed().setColor('#ff0000');
    const successEmbed = new Discord.MessageEmbed().setColor('#00ff59').setAuthor(msg.guild.name).setThumbnail(msg.guild.iconURL({format: 'png', dynamic: true,size: 1024})).setTimestamp();
    const quesEmbed = new Discord.MessageEmbed().setColor('#ffc400').setFooter('Type cancel to cancel the setup anytime!').setTimestamp().setAuthor(msg.guild.name).setThumbnail(msg.guild.iconURL({format: 'png', dynamic: true,size: 1024}));
    const qqEM = new Discord.MessageEmbed().setColor('#ffc400').setTimestamp().setAuthor(msg.guild.name).setThumbnail(msg.guild.iconURL({format: 'png', dynamic: true,size: 1024}));

    let isComplete;
    if(dataCheck[msg.guild.id] && dataCheck[msg.guild.id].adComplete && dataCheck[msg.guild.id].adComplete == true){
        isComplete = `**${Bot.commands.get('publicize').help.module}**\n${Bot.commands.get('publicize').help.completeDesc}\n\n**${Bot.prefix}${Bot.commands.get('publicize').help.changeable.join(`\n**${Bot.prefix}`)}`;
    }else{
        isComplete = `**${Bot.commands.get('publicize').help.module}**\n${Bot.commands.get('publicize').help.description}\n\n\`Usage:\`\n**${Bot.prefix}${Bot.commands.get('publicize').help.usage}**`;
    }

    //__________________________________________________________________________________________________
    //saving all arguments in arg

    const arg = {};
    arg.args = args;
    arg.Bot = Bot;
    arg.msg = msg;
    arg.settings = Bot.settings;
    arg.eEM = errEmbed;
    arg.sEM = successEmbed;
    arg.qEM = quesEmbed;
    arg.prefix = Bot.prefix;
    arg.fetch = fetch;
    arg.brawlAPI = brawlAPI;
    arg.bfinder = brawlEmotesFinder;
    arg.tfinder = trophyEmotesFinder;
    arg.emotes = emotes;
    arg.image = false;
    arg.dataCheck = dataCheck;
    arg.fs = fs;
    arg.qqEM = qqEM;
    arg.imageChecker = imageChecker;
    arg.cfinder = clubEmoteFinder;

    //__________________________________________________________________________________________________
    //check the call for server or user!

    let choose = args[0];
    if(choose){
        choose = choose.toLowerCase();
    }
    switch(choose){
        case undefined:{
            Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
            return msg.channel.send(successEmbed.setDescription(isComplete));
        }

        case 'setupserver':{
            if(arg.dataCheck[arg.msg.guild.id] && arg.dataCheck[arg.msg.guild.id].adComplete && arg.dataCheck[arg.msg.guild.id].adComplete == true){
                Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                return arg.msg.channel.send(arg.sEM.setDescription(isComplete));
            }
            Server(arg);
        }break;

        case 'setupuser':{
            User(arg);
        }break;

        case 'servertag':{
            if(dataCheck[msg.guild.id] && dataCheck[msg.guild.id] && dataCheck[msg.guild.id].adComplete){
                changeServerTag(arg);
            }else{
                Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                return msg.channel.send(arg.eEM.setDescription(`Please complete your setup first.\n\n\`Usage\`\n**${Bot.prefix}${Bot.commands.get('publicize').help.usage}**`));
            }
        }break;

        case 'serverdesc':{
            if(dataCheck[msg.guild.id] && dataCheck[msg.guild.id] && dataCheck[msg.guild.id].adComplete){
                changeDesc(arg);
            }else{
                Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                return msg.channel.send(arg.eEM.setDescription(`Please complete your setup first.\n\n\`Usage\`\n**${Bot.prefix}${Bot.commands.get('publicize').help.usage}**`));
            }
        }break;

        case 'serverdescription':{
            if(dataCheck[msg.guild.id] && dataCheck[msg.guild.id] && dataCheck[msg.guild.id].adComplete){
                changeDesc(arg);
            }else{
                Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                return msg.channel.send(arg.eEM.setDescription(`Please complete your setup first.\n\n\`Usage\`\n${Bot.prefix}${Bot.commands.get('publicize').help.usage}`));
            }
        }break;

        case 'serverchannel':{
            if(dataCheck[msg.guild.id] && dataCheck[msg.guild.id] && dataCheck[msg.guild.id].adComplete){
                changeCh(arg);
            }else{
                Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                return msg.channel.send(arg.eEM.setDescription(`Please complete your setup first.\n\n\`Usage\`\n**${Bot.prefix}${Bot.commands.get('publicize').help.usage}**`));
            }
        }break;

        case 'serverch':{
            if(dataCheck[msg.guild.id] && dataCheck[msg.guild.id] && dataCheck[msg.guild.id].adComplete){
                changeCh(arg);
            }else{
                Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                return msg.channel.send(arg.eEM.setDescription(`Please complete your setup first.\n\n\`Usage\`\n**${Bot.prefix}${Bot.commands.get('publicize').help.usage}**`));
            }
        }break;

        case 'serverrequirement':{
            if(dataCheck[msg.guild.id] && dataCheck[msg.guild.id] && dataCheck[msg.guild.id].adComplete){
                changeReq(arg);
            }else{
                Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                return msg.channel.send(arg.eEM.setDescription(`Please complete your setup first.\n\n\`Usage\`\n**${Bot.prefix}${Bot.commands.get('publicize').help.usage}**`));
            }
        }break;
        
        case 'serverreq':{
            if(dataCheck[msg.guild.id] && dataCheck[msg.guild.id] && dataCheck[msg.guild.id].adComplete){
                changeReq(arg);
            }else{
                Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                return msg.channel.send(arg.eEM.setDescription(`Please complete your setup first.\n\n\`Usage\`\n**${Bot.prefix}${Bot.commands.get('publicize').help.usage}**`));
            }
        }break;

        case 'serverbanner':{
            if(dataCheck[msg.guild.id] && dataCheck[msg.guild.id] && dataCheck[msg.guild.id].adComplete){
                changeBanner(arg);
            }else{
                Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                return msg.channel.send(arg.eEM.setDescription(`Please complete your setup first.\n\n\`Usage\`\n**${Bot.prefix}${Bot.commands.get('publicize').help.usage}**`));
            }
        }break;

        case 'serverconfig':{
            if(dataCheck[msg.guild.id] && dataCheck[msg.guild.id] && dataCheck[msg.guild.id].adComplete == true){
                configuration(arg);
            }else{
                Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                return msg.channel.send(arg.eEM.setDescription(`Please complete your setup first.\n\n\`Usage\`\n**${Bot.prefix}${Bot.commands.get('publicize').help.usage}**`));
            }
        }break;

        default:{
            Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
            return msg.channel.send(successEmbed.setDescription(`Wrong usage: **${args.join(' ')}**\n\n${isComplete}`));
        }
    }

    //Check call end!
    //__________________________________________________________________________________________________
    //server setup start, asking the club tag!
    function Server(arg){
        if(!msg.member.hasPermission('MANAGE_GUILD' || 'MANAGE_SERVER')){
        Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
        return arg.msg.channel.send(arg.eEM.setDescription('<a:noo:738828172736331827> __Access denied__ \nYou must have permission **MANAGE SERVER**'));
        }
        arg.msg.channel.send(arg.qEM.setDescription('Please enter the club tag you want to setup for!')).then(msg2 => {
            arg.msg2 = msg2;
            awaitMSGgetTag(arg);
        })
    }

    //Await message to get club tag
    function awaitMSGgetTag(arg){
        arg.msg.channel.awaitMessages(m => m.content.length > 0 && m.author.id == arg.msg.author.id, {max: 1, time:60000, errors: ['time']})
        .then(collected => {
            let argu = collected.first().content;
            collected.first().delete();
            if(argu.toLowerCase() == 'cancel'){ 
                Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                return arg.msg2.edit(arg.sEM.setDescription('Alright, Setup has been succesfully cancelled! <a:Tick:738827960773115965>'));
        }
            let tag = arg.brawlAPI.checkTag(argu);
            if(tag == false){
                arg.msg2.edit(arg.eEM.setDescription(`Provided tag **${argu}** isn't valid, please send again!`));
                return awaitMSGgetTag(arg);
            }
            arg.tag = tag;
            brawlRequest(arg);
        })
        .catch(err => {
            if(err){
                if(err.map){
                    Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                    return arg.msg2.edit(arg.eEM.setDescription('Timeout! please try again later.'));
                }else{
                    Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                    console.log(err);
                    return arg.msg2.edit(arg.eEM.setDescription(`Encountered an error:\`\`\`js\n${err.message}\n\`\`\`\nPlease report it to our ${arg.Bot.support}.`));
                }
            }
        })
    }

    //Making API request from brawl stars end point!
    function brawlRequest(arg){
        setTimeout(function(){
        let token = arg.brawlAPI.getToken(Bot);
         arg.fetch('https://api.brawlstars.com/v1/clubs/%23'+arg.tag,{
            method: 'GET',
            headers: {
                'content-Type': 'application/json',
                'authorization': 'Bearer '+token
            }
        })
                .then(res => {
                let status = res.status;
                if(status == 200){
                    return res.json();
                }
                else {
                return status;
                }
            })
            .then(json => {
                let c = arg.brawlAPI.checkCode(arg.Bot,arg.msg,arg.tag,json);
                if(c=='false'){
                    Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                    return;
                }
                arg.msg2.edit(arg.qEM.setDescription(`Alright, the club tag is **${arg.tag}** & club name **${json.name}**\n\n**What description or a message you want to put in your advertisement about your club?**`));
                    arg.json = json;
                    awaitMSGgetDesc(arg);
            })
            .catch(error => {
                console.log(error);
                return arg.msg2.edit(arg.eEM.setDescription(`Encountered an error:\`\`\`js\n${err.message}\n\`\`\`\nPlease report it to our ${arg.Bot.support}.`));
            });
        },100);
        }

    //Await to get the description!
    function awaitMSGgetDesc(arg){
        arg.msg.channel.awaitMessages(m => m.content.length > 0 && m.author.id == arg.msg.author.id, {max: 1, time:60000, errors: ['time']})
        .then(collected => {
            let desc = collected.first().content;
            collected.first().delete();
            if(desc.toLowerCase() == 'cancel'){
                Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                return arg.msg2.edit(arg.sEM.setDescription('Alright, setup has been successfully cancelled! <a:Tick:738827960773115965>'));
            }
        else if(desc.length > 1023){
                arg.msg2.edit(arg.eEM.setDescription('Your advertisement description is too long! Should not be greater than 1024 words.\nPlease enter again!'));
                return awaitMSGgetDesc(arg);
            }
            arg.msg2.edit(arg.qEM.setDescription('Your given description has been set! <a:Tick:738827960773115965>\n\n**Please mention the channel where the club feeds will be sent!**'));
            arg.desc = desc;
            awaitMSGchannel(arg);
        })
        .catch(err => {
            if(err){
                if(err.map){
                    Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                    return arg.msg2.edit(arg.eEM.setDescription('Timeout! please try again later.'));
                }else{
                    Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                    console.log(err);
                    return arg.msg2.edit(arg.eEM.setDescription(`Encountered an error:\`\`\`js\n${err.message}\n\`\`\`\nPlease report it to our ${arg.Bot.support}.`));
                }
            }
        })
    }

    //Await to get channel - mentioned!
    function awaitMSGchannel(arg){
        arg.msg.channel.awaitMessages(m => m.mentions.channels.size > 0 && m.author.id == arg.msg.author.id, {max: 1, time:60000, errors: ['time']})
        .then(collected => {
            let ch = collected.first();
            collected.first().delete();
            if(ch.content.toLowerCase() == 'cancel'){
                Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
             return arg.msg2.edit(arg.sEM.setDescription('Alright, setup has been successfully cancelled! <a:Tick:738827960773115965>'));
        }
            let channel = ch.mentions.channels.first();
            if(channel){
            if(!arg.msg.guild.members.cache.get(arg.Bot.user.id).permissionsIn(arg.msg.guild.channels.cache.get(channel.id)).has('VIEW_CHANNEL')) return arg.msg2.edit(arg.eEM.setDescription(`Please give me the following permissions: \n**SEND_MESSAGES\nREAD_MESSAGES\nMANAGE_WEBHOOKS** \nin channel ${channel} and then try again!`));
            else if(!arg.msg.guild.members.cache.get(arg.Bot.user.id).permissionsIn(arg.msg.guild.channels.cache.get(channel.id)).has('SEND_MESSAGES')) return arg.msg2.edit(arg.eEM.setDescription(`Please give me the following permissions: \n**SEND_MESSAGES\nMANAGE_WEBHOOKS** \nin channel ${channel} and then try again!`));
            else if(!arg.msg.guild.members.cache.get(arg.Bot.user.id).permissionsIn(arg.msg.guild.channels.cache.get(channel.id)).has('MANAGE_WEBHOOKS')) return arg.msg2.edit(arg.eEM.setDescription(`Please give me the following permissions: \n**MANAGE_WEBHOOKS** \nin channel ${channel} nd then try again!`));
            arg.msg2.edit(arg.qEM.setDescription(`The feed channel ${channel} has been set <a:Tick:738827960773115965>!\n\n**What is the requirement of your club or which type/region of players you want?**`));
            arg.channel = arg.msg.guild.channels.cache.get(channel.id);
            awaitRequirement(arg);
            }
        })
        .catch(err => {
            if(err){
                if(err.map){
                    Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                    return arg.msg2.edit(arg.eEM.setDescription('Timeout! please try again later.'));
                }else{
                    Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                    console.log(err);
                    return arg.msg2.edit(arg.eEM.setDescription(`Encountered an error:\`\`\`js\n${err.message}\n\`\`\`\nPlease report it to our ${arg.Bot.support}.`));
                }
            }
        })
    }

    //Await to get the requirement for club!
    function awaitRequirement(arg){
        arg.msg.channel.awaitMessages(m => m.content.length > 0 && m.author.id == arg.msg.author.id,{max: 1, time:60000, errors: ['time']})
        .then(collected => {
            let req = collected.first().content;
            collected.first().delete();
            if(req.toLowerCase() == 'cancel'){
            Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
            return arg.msg2.edit(arg.sEM.setDescription('Alright, setup has been successfully cancelled! <a:Tick:738827960773115965>'));
            }
            else if(req.length > 1023){
                arg.msg2.edit(arg.eEM.setDescription('Your requirement message is too long! Should not be greater than 1024 words.\nPlease enter again!'));
                return awaitRequirement(arg);
            }
            arg.msg2.edit(arg.qEM.setDescription(`Your club requirement has been set! <a:Tick:738827960773115965>\n\nDo you have any recruitment banner for your advertisement?\nIf yes then send the link or image of it, else send **no** if you don't.\n\n( **Hint:** Send **default** to use your server's icon as banner!)`));
            arg.req = req;
            awaitBanner(arg);
        })
        .catch(err => {
            if(err){
                if(err.map){
                    Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                    return arg.msg2.edit(arg.eEM.setDescription('Timeout! please try again later.'));
                }else{
                    Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                    console.log(err);
                    return arg.msg2.edit(arg.eEM.setDescription(`Encountered an error:\`\`\`js\n${err.message}\n\`\`\`\nPlease report it to our ${arg.Bot.support}.`));
                }
            }
        })
    }

    //Await to get recruitment banner!
    function awaitBanner(arg){
        arg.msg.channel.awaitMessages(m => m.attachments.size > 0 && m.author.id == arg.msg.author.id || ['.png', '.gif', '.webp', '.jpg', '.jpeg', 'default'].some(e => m.content.toLowerCase().includes(e)) && m.author.id == arg.msg.author.id,{max: 1, time:60000, errors: ['time']})
        .then(collected => {
            let attach = collected.first();
            collected.first().delete();
            if(attach.content && attach.content.toLowerCase() == 'cancel'){
                Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
            return arg.msg2.edit(arg.sEM.setDescription('Alright, setup has been successfully cancelled! <a:Tick:738827960773115965>'));
            }
            else if(attach.content && attach.content.toLowerCase() == 'default'){
                arg.banner = 'default';
                arg.image = true;
            }
            else if(attach.attachments.size > 0){
                let attachURL = attach.attachments.first().url;
                if(isImage == false){
                    arg.msg2.edit(arg.eEM(`This isn't an image, please send again!`));
                    return awaitBanner(arg);
                } 
                arg.banner = attachURL;
                arg.image = true;
            }
            else if(attach.content && arg.imageChecker(attach.content)){
                        arg.banner = attach.content;
                        arg.image = true;
            }
            else if(attach.content && attach.content.toLowerCase().includes('no')){
                        arg.image = false;
                        arg.banner = null;
            }
            else{
                arg.msg.channel.send(arg.eEM.setDescription('Provided attachment isn\'t an image, please send again.'));
                return awaitBanner(arg);
            }
            arg.msg2.edit(arg.sEM.setDescription('Your setup has been succesfully completed! Please wait, while i am sending the configuration and saving the given details!').setFooter(`Use command ${arg.prefix}bump to start advertising your club in multiple servers!`));
            let data = JSON.parse(arg.fs.readFileSync('./data/database/serverAdData.csv','utf8'));
            if(!data[arg.msg.guild.id]){
                data[arg.msg.guild.id] = {
                    adComplete: false
                }
            }
            data[arg.msg.guild.id].adClubTag = arg.tag;
            data[arg.msg.guild.id].adClubDescription = arg.desc;
            data[arg.msg.guild.id].adClubChannel = arg.channel.id;
            data[arg.msg.guild.id].adClubRequirement = arg.req;
            data[arg.msg.guild.id].adClubBannerURL = arg.banner;
            data[arg.msg.guild.id].hasImage = arg.image;
            data[arg.msg.guild.id].adComplete = true;
            data[arg.msg.guild.id].adCreatedAt = Date.now();
            let array = [];
            if(!data.adGuilds){
                array.push(arg.msg.guild.id);
                data.adGuilds = array;
            }else{
                data.adGuilds.push(arg.msg.guild.id);
            }
            arg.fs.writeFileSync('./data/database/serverAdData.csv', JSON.stringify(data),(err) => {
                if(err){
                    console.log(err);
                    return arg.msg2.edit(arg.eEM.setDescription(`Encountered an error:\`\`\`js\n${err.message}\n\`\`\`\nPlease report it to our ${arg.Bot.support}.`));
                }
            })
            config(arg);
        })
        .catch(err => {
            if(err){
                if(err.map){
                    Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                    return arg.msg2.edit(arg.eEM.setDescription('Timeout! please try again later.'));
                }else{
                    Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                    console.log(err);
                    return arg.msg2.edit(arg.eEM.setDescription(`Encountered an error:\`\`\`js\n${err.message}\n\`\`\`\nPlease report it to our ${arg.Bot.support}.`));
                }
            }
        })


        //Sending the setup
        function config(arg){
            (async () => {
            let members = arg.json.members;
            let TopMembers = [], TopSeniors = [], TopPresidents = [], obj, presi = [], clubTrophies = 0, tSeniors = 0, tMembers = 0, tPresidents = 0; 
            for(x=0; x<members.length; x++){
                if(members[x]){
                if(members[x].role == 'member'){
                    tMembers += 1;
                    if(tMembers < 6){
                    obj = await arg.tfinder.getIcon(members[x].trophies);
                    rank = obj.rank;
                    let mem = `\`#${x+1}\` ${obj.emote}\`${obj.rank}\` ${members[x].trophies} [${members[x].name}](https://www.starlist.pro/stats/profile/${members[x].tag.slice(1)})`;
                    TopMembers.push(mem);
                    }
                }
                else if(members[x].role == 'senior'){
                    tSeniors += 1;
                    if(tSeniors < 6){
                        
                        obj = await arg.tfinder.getIcon(members[x].trophies);
                        rank = obj.rank;
                        let mem = `\`#${x+1}\` ${obj.emote}\`${obj.rank}\` ${members[x].trophies} [${members[x].name}](https://www.starlist.pro/stats/profile/${members[x].tag.slice(1)})`;
                    TopSeniors.push(mem);
                    }
                }
                else if(members[x].role == 'president' || members[x].role == 'vicePresident'){
                    tPresidents += 1;
                    if(tPresidents < 6){
                        obj = await arg.tfinder.getIcon(members[x].trophies);
                        rank = obj.rank;
                        let mem = `\`#${x+1}\` ${obj.emote}\`${obj.rank}\` ${members[x].trophies} [${members[x].name}](https://www.starlist.pro/stats/profile/${members[x].tag.slice(1)})`;
                    TopPresidents.push(mem);
                    }
                    if(members[x].role == 'president'){
                        let mem = {}
                        obj = await arg.tfinder.getIcon(members[x].trophies);
                        mem.rank = obj.rank;
                        mem.icon = obj.emote;
                        mem.name = members[x].name;
                        mem.tag = members[x].tag.slice(1);
                        presi.push(mem);
                    }
                }
                clubTrophies = clubTrophies + members[x].trophies;
            }
            }
            let inviteURl; 
            await arg.channel.createInvite({maxAge: 0,unique:false}).then(invite => {
                inviteURl = invite.url;
            })
            let image;
            if(arg.banner && arg.banner == 'default'){
                image = arg.msg.guild.iconURL({dynamic:true,size:4096});
            }else{
                image = arg.banner;
            }
            let iconLink = await arg.cfinder.getEmote(Bot,'link',arg.json.badgeId);
            arg.sEM.setAuthor(arg.msg.guild.name,arg.msg.guild.iconURL({dynamic:true}),inviteURl)
            .setDescription('\u200B')
            .setThumbnail(iconLink)
            .setTitle(`${arg.json.name} is recruiting!`)
            .setURL('https://www.starlist.pro/stats/club'+arg.tag)
            .addField('Club Trophies',`${arg.emotes.trophy} ${clubTrophies}`,true)
            .addField('Members',`${arg.emotes.club} ${arg.json.members.length}/100`,true)
            .addField('President', `${arg.emotes.crown} [${presi[0].name}](https://www.starlist.pro/stats/profile${presi[0].tag})`,true)
            .addField('Required Trophies',`${arg.emotes.rtrophy} ${arg.json.requiredTrophies}`,true)
            .addField('Club Type',`${arg.emotes.info} ${arg.json.type}`,true)
            .addField('Average Trophies',`${await arg.tfinder.getIcon(clubTrophies).emote}\`${await arg.tfinder.getIcon(clubTrophies).rank}\` ${Math.round(clubTrophies/arg.json.members.length)}`,true);
            if(tMembers > 0){
                arg.sEM.addField(`Top Members ${TopMembers.length}/${tMembers}`,`${TopMembers.join('\n')}`,true);
            }
            if(tSeniors > 0){
                arg.sEM.addField(`Top Seniors ${TopSeniors.length}/${tSeniors}`,`${TopSeniors.join('\n')}`,true);
            }
            arg.sEM.addField(`Top Presidents ${TopPresidents.length}/${tPresidents}`,`${TopPresidents.join('\n')}`,true)
            .addField(`About ${arg.json.name}`,`${arg.desc}`)
            .addField('Our Requirements',`${arg.req}`);
           arg.msg.channel.send(inviteURl,arg.sEM);
           if(arg.image == true && (image != undefined || image != null)){
            arg.msg.channel.send({files:[image]});
           }
           Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
           return;
            })();
        }
    }

    // server setup end
    //__________________________________________________________________________________________________
    //user setup start
    function User(arg){
        return;
    }
    // user setup end
    //__________________________________________________________________________________________________
    //Change server tag
    function changeServerTag(arg){
        if(!arg.args[1]){
            Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
            return arg.msg.channel.send(arg.qqEM.setDescription(`Please provide the tag, \n\`Usage\`\n**${Bot.prefix}${Bot.commands.get('publicize').help.changeable[0]}**`));
        }
        let tag = arg.brawlAPI.checkTag(arg[1]);
        if(tag == false){
            Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
            return arg.msg.channel.send(arg.eEM.setDescription(`Given tag **${arg[1]}** isn't valid.Please try again!`));
        }
        setTimeout(function(){
            let token = arg.brawlAPI.getToken(Bot);
             arg.fetch('https://api.brawlstars.com/v1/clubs/%23'+tag,{
                method: 'GET',
                headers: {
                    'content-Type': 'application/json',
                    'authorization': 'Bearer '+token
                }
            })
                    .then(res => {
                    let status = res.status;
                    if(status == 200){
                        return res.json();
                    }
                    else {
                    return status;
                    }
                })
                .then(json => {
                   let c = arg.brawlAPI.checkCode(arg.Bot,arg.msg,tag,json);
                   if(c=='false'){
                    Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                       return;
                   }
                    let data = JSON.parse(arg.fs.readFileSync('./data/database/serverAdData.csv','utf8'));
                        let oldTag = data[arg.msg.guild.id].adClubTag;
                        data[arg.msg.guild.id].adClubTag = json.tag.slice(1);
                        arg.fs.writeFileSync('./data/database/serverAdData.csv',JSON.stringify(data),(err)=>{
                            if(err){
                                console.log(err);
                                Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                                return arg.msg2.edit(arg.eEM.setDescription(`Encountered an error:\`\`\`js\n${err.message}\n\`\`\`\nPlease report it to our ${arg.Bot.support}.`));
                            }
                        })
                        Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                        return arg.msg.channel.send(arg.sEM.setDescription(`Alright, the new club tag is ${arg.args[1]} & club name is ${json.name} is now saved and the old tag ${oldTag} has been removed.`));
                })
                .catch(error => {
                    console.log(error);
                });
        },100)
    }

    //change server description
    function changeDesc(arg){
        if(!arg.args[1]){
            Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
            return arg.msg.channel.send(arg.qqEM.setDescription(`Please provide the description for your advertisement, \n\`Usage\`\n**${Bot.prefix}${Bot.commands.get('publicize').help.changeable[1]}**`));
        }
        else if(arg.args[1].length > 1023){
            Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
            return arg.msg2.edit(arg.qqEM.setDescription('Your description is too long! Should not be greater than 1024 words.\nPlease try again!'));
        }
        let data = JSON.parse(arg.fs.readFileSync('./data/database/serverAdData.csv','utf8'));
        data[arg.msg.guild.id].adClubDescription = arg.args[1];
        arg.fs.writeFileSync('./data/database/serverAdData.csv',JSON.stringify(data),(err)=>{
        if(err){
            Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                console.log(err);
                return arg.msg2.edit(arg.eEM.setDescription(`Encountered an error:\`\`\`js\n${err.message}\n\`\`\`\nPlease report it to our ${arg.Bot.support}.`));
            }
    })
    Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
    return arg.msg.channel.send(arg.sEM.setDescription(`Alright, your new description has been saved!`));
    }

    //change server channel
    function changeCh(arg){
        if(!arg.msg.mentions.channels.size > 0){
            Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
            return arg.msg.channel.send(arg.qqEM.setDescription(`Please mention the channel.\n\`Usage\`\n**${Bot.prefix}${Bot.commands.get('publicize').help.changeable[2]}**`));
        }else{
        let channel = arg.msg.mentions.channels.first();
            if(!arg.msg.guild.members.cache.get(arg.Bot.user.id).permissionsIn(arg.msg.guild.channels.cache.get(channel.id)).has('VIEW_CHANNEL')) return arg.msg.channel.send(arg.eEM.setDescription(`Please give me the following permissions: \n**SEND_MESSAGES\nREAD_MESSAGES\nMANAGE_WEBHOOKS** \nin channel ${channel} and then try again!`));
            else if(!arg.msg.guild.members.cache.get(arg.Bot.user.id).permissionsIn(arg.msg.guild.channels.cache.get(channel.id)).has('SEND_MESSAGES')) return arg.msg.channel.send(arg.eEM.setDescription(`Please give me the following permissions: \n**SEND_MESSAGES\nMANAGE_WEBHOOKS** \nin channel ${channel} and then try again!`));
            else if(!arg.msg.guild.members.cache.get(arg.Bot.user.id).permissionsIn(arg.msg.guild.channels.cache.get(channel.id)).has('MANAGE_WEBHOOKS')) return arg.msg.channel.send(arg.eEM.setDescription(`Please give me the following permissions: \n**MANAGE_WEBHOOKS** \nin channel ${channel} nd then try again!`));

            let data = JSON.parse(arg.fs.readFileSync('./data/database/serverAdData.csv','utf8'));
            data[arg.msg.guild.id].adClubChannel = channel.id;
            arg.fs.writeFileSync('./data/database/serverAdData.csv',JSON.stringify(data),(err)=>{
            if(err){
                Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                console.log(err);
                return arg.msg2.edit(arg.eEM.setDescription(`Encountered an error:\`\`\`js\n${err.message}\n\`\`\`\nPlease report it to our ${arg.Bot.support}.`));
            }
    })
        Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
       return arg.msg.channel.send(arg.sEM.setDescription(`Alright, your new feed channel has been saved!`));
}
    }

    //change server requirement
    function changeReq(arg){
        if(!arg.args[1]){
            Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
            return arg.msg.channel.send(arg.qqEM.setDescription(`Please provide the requirement message for your advertisement, \n\`Usage\`\n**${Bot.prefix}${Bot.commands.get('publicize').help.changeable[3]}**`));
        }
        else if(arg.args[1].length > 1023){
            Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
            return arg.msg2.edit(arg.qqEM.setDescription('Your requirement message is too long! Should not be greater than 1024 words.\nPlease try again!'));
        }
        let data = JSON.parse(arg.fs.readFileSync('./data/database/serverAdData.csv','utf8'));
        data[arg.msg.guild.id].adClubRequirement = arg.args[1];
        arg.fs.writeFileSync('./data/database/serverAdData.csv',JSON.stringify(data),(err)=>{
        if(err){
                console.log(err);
                Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                return arg.msg2.edit(arg.eEM.setDescription(`Encountered an error:\`\`\`js\n${err.message}\n\`\`\`\nPlease report it to our ${arg.Bot.support}.`));
            }
    })
    Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
        return arg.msg.channel.send(arg.sEM.setDescription(`Alright, your new requirement has been saved!`));
    }

    //change server banner
    function changeBanner(arg){
        let data = JSON.parse(arg.fs.readFileSync('./data/database/serverAdData.csv','utf8'));
        if(!arg.args[1] && !(arg.msg.attachments.size > 0)){
            Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
            return arg.msg.channel.send(arg.qqEM.setDescription(`Please attach any image with the command or give a link.\n\`Usage\`\n**${Bot.prefix}${Bot.commands.get('publicize').help.changeable[4]}**`));
        }
        else if(arg.msg.attachments.size > 0){
            imageURL = arg.msg.attachments.first().url;
            let isImage = arg.imageChecker(imageURL);
            if(isImage == false){
            Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
            return arg.msg.channel.send(arg.eEM(`This isn't an image, please try again!`));
            }
            data[arg.msg.guild.id].hasImage = true;
            data[arg.msg.guild.id].adClubBannerURL = imageURL;
        }
        else if(arg.args[1] && arg.imageChecker(arg.args[1])){
            imageURL = arg.args[1];
            data[arg.msg.guild.id].hasImage = true;
            data[arg.msg.guild.id].adClubBannerURL = imageURL;
        }
        else if(arg.args[1] && arg.args[1].toLowerCase().includes('remove')){
            data[arg.msg.guild.id].hasImage = false;
            data[arg.msg.guild.id].adClubBannerURL = null
        }
        else{
            Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
            return arg.msg.channel.send(arg.eEM.setDescription('Provided attachment or link isn\'t an image. Please try again.'));
        }
        arg.fs.writeFileSync('./data/database/serverAdData.csv',JSON.stringify(data), (err) => {
            if(err){
                console.log(err);
                if(arg.args[1].toLowerCase().includes('remove')){
                    Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                    return arg.msg2.edit(arg.eEM.setDescription(`Encountered an error:\`\`\`js\n${err.message}\n\`\`\`\nPlease report it to our ${arg.Bot.support}.`));
                }else{
                    Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                    return arg.msg2.edit(arg.eEM.setDescription(`Encountered an error:\`\`\`js\n${err.message}\n\`\`\`\nPlease report it to our ${arg.Bot.support}.`));
                }
            }
        })
        if(arg.args[1] && arg.args[1].toLowerCase().includes('remove')){
            Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
           return arg.msg.channel.send(arg.sEM.setDescription('Your given image has been removed!.'));
        }else{
            Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
            return arg.msg.channel.send(arg.sEM.setDescription('Your given image has been saved as a banner!.'));
        }
    }

    function configuration(arg){
            const token = arg.brawlAPI.getToken(arg.Bot);
            const tag = arg.dataCheck[arg.msg.guild.id].adClubTag;
            setTimeout(function(){
                 arg.fetch('https://api.brawlstars.com/v1/clubs/%23'+tag,{
                    method: 'GET',
                    headers: {
                        'content-Type': 'application/json',
                        'authorization': 'Bearer '+token
                    }
                })
                        .then(res => {
                        let status = res.status;
                        if(status == 200){
                            return res.json();
                        }
                        else {
                        return status;
                        }
                    })
                    .then(json => {
                       let c = arg.brawlAPI.checkCode(arg.Bot,arg.msg,tag,json);
                       if(c=='false'){
                        Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                           return;
                       }
             (async () => {
                 let data = arg.dataCheck[arg.msg.guild.id];
            if(!data){
                Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
             return arg.msg.channel.send(arg.Bot.errEm.setDescription(`Please complete your club setup first by command **${arg.Bot.prefix}setup server**.`));
        }
        else if(!data.adComplete){
            Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
             return arg.msg.channel.send(arg.Bot.errEm.setDescription(`Please complete your club setup first by command **${arg.Bot.prefix}setup server**.`));
           }
            let members = json.members;
            let TopMembers = [], TopSeniors = [], TopPresidents = [], obj, presi = [], clubTrophies = 0, tSeniors = 0, tMembers = 0, tPresidents = 0; 
            for(x=0; x<members.length; x++){
                if(members[x]){
                if(members[x].role == 'member'){
                    tMembers += 1;
                    if(tMembers < 6){
                    obj = await arg.tfinder.getIcon(members[x].trophies);
                    rank = obj.rank;
                    let mem = `\`#${x+1}\` ${obj.emote}\`${obj.rank}\` ${members[x].trophies} [${members[x].name}](https://www.starlist.pro/stats/profile/${members[x].tag.slice(1)})`;
                    TopMembers.push(mem);
                    }
                }
                else if(members[x].role == 'senior'){
                    tSeniors += 1;
                    if(tSeniors < 6){
                        
                        obj = await arg.tfinder.getIcon(members[x].trophies);
                        rank = obj.rank;
                        let mem = `\`#${x+1}\` ${obj.emote}\`${obj.rank}\` ${members[x].trophies} [${members[x].name}](https://www.starlist.pro/stats/profile/${members[x].tag.slice(1)})`;
                    TopSeniors.push(mem);
                    }
                }
                else if(members[x].role == 'president' || members[x].role == 'vicePresident'){
                    tPresidents += 1;
                    if(tPresidents < 6){
                        obj = await arg.tfinder.getIcon(members[x].trophies);
                        rank = obj.rank;
                        let mem = `\`#${x+1}\` ${obj.emote}\`${obj.rank}\` ${members[x].trophies} [${members[x].name}](https://www.starlist.pro/stats/profile/${members[x].tag.slice(1)})`;
                    TopPresidents.push(mem);
                    }
                    if(members[x].role == 'president'){
                        let mem = {}
                        obj = await arg.tfinder.getIcon(members[x].trophies);
                        mem.rank = obj.rank;
                        mem.icon = obj.emote;
                        mem.name = members[x].name;
                        mem.tag = members[x].tag.slice(1);
                        presi.push(mem);
                    }
                }
                clubTrophies = clubTrophies + members[x].trophies;
            }
            }
            
            let image;
            if(data.adClubBannerURL && data.adClubBannerURL == 'default'){
                image = arg.msg.guild.iconURL({dynamic:true,size:4096});
            }else{
                image = data.adClubBannerURL;
            }
            let opt = 'link';
            let iconLink = await arg.cfinder.getEmote(Bot,opt,json.badgeId);
            console.log(iconLink);
            let inviteUrl;
            let channel = msg.guild.channels.cache.get(data.adClubChannel);
            if(channel){
                await channel.createInvite({maxAge: 0,unique:false}).then(invite => {
                    inviteUrl = invite.url;
                })
            }else{
                Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                return msg.channel.send(Bot.errEm.setDescription(`Feed channel no longer exist, please set a new feed channel by command **${Bot.prefix}setup serverCh #mention_channel**`));
            }

            const sEM = new Discord.MessageEmbed();
            sEM.setAuthor(arg.msg.guild.name,arg.msg.guild.iconURL({dynamic:true}),inviteUrl)
            .setColor('RANDOM')
            .setThumbnail(iconLink)
            .setTitle(`${json.name} is recruiting!`)
            .setURL('https://www.starlist.pro/stats/club/'+json.tag.slice(1))
            .addField('Club Trophies',`${emotes.trophy} ${clubTrophies}`,true)
            .addField('Members',`${emotes.club} ${json.members.length}/100`,true)
            .addField('President', `${emotes.crown} [${presi[0].name}](https://www.starlist.pro/stats/profile/${presi[0].tag})`,true)
            .addField('Required Trophies',`${emotes.rtrophy} ${json.requiredTrophies}`,true)
            .addField('Club Type',`${emotes.info} ${json.type}`,true)
            .addField('Average Trophies',`${await arg.tfinder.getIcon(clubTrophies).emote}\`${await arg.tfinder.getIcon(clubTrophies).rank}\` ${Math.round(clubTrophies/json.members.length)}`,true);
            if(tMembers > 0){
                sEM.addField(`Top Members ${TopMembers.length}/${tMembers}`,`${TopMembers.join('\n')}`,true);
            }
            if(tSeniors > 0){
                sEM.addField(`Top Seniors ${TopSeniors.length}/${tSeniors}`,`${TopSeniors.join('\n')}`,true);
            }
            sEM.addField(`Top Presidents ${TopPresidents.length}/${tPresidents}`,`${TopPresidents.join('\n')}`,true)
            .addField(`About ${json.name}`,`${data.adClubDescription}`)
            .addField('Our Requirements',`${data.adClubRequirement}`);
            arg.msg.channel.send(inviteUrl,sEM);
            if(image){
                arg.msg.channel.send({
                    files: [image]
                })
            }
            Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
            return;
                            })();
                    }).catch(err => {
                        if(err){
                            Bot.runningCommand.set(`${msg.guild.id}-publicize`,false);
                            console.log(err);
                            return arg.msg2.edit(arg.eEM.setDescription(`Encountered an error:\`\`\`js\n${err.message}\n\`\`\`\nPlease report it to our ${arg.Bot.support}.`));
                        }
                    })
                },100);
    }
}

module.exports.help = {
    name: 'publicize',
    module: 'Recruitment Module',
    description: 'Setup server data to advertise your club.',
    usage: `publicize setupServer`,
    completeDesc: `Your setup has been completed, if you want to change your any data then you can use the following commands:`,
    aliases: ['advertiser','recruiter','ad'],
    changeable: ['publicize serverTag #YourClubTag** - \`To change the tag of the club.\`',
                 'publicize serverDesc Your_Description** - \`To change the description.\`',
                 'publicize serverCh #mention_channel** - \`To change the feed channel.\`',
                 'publicize serverReq Your_club_requirement** - \`To change your club requirement message.\`',
                 'publicize serverbanner image_link or attach_an_image** - \`To change recruitment banner.\`\n\`Type remove instead of image_link to remove the banner.\`',
                 'publicize serverConfig** - \`To check your advertisement setup.\`']
}

module.exports.requirements = {
    userPerms: ['MANAGE_GUILD'],
    BotPerms: ['MANAGE_GUILD','MANAGE_CHANNELS'],
    ownerOnly: false,
    adminOnly: false
}

module.exports.serverLimits = {
    rateLimit: 3,
    cooldown:  6e4
}