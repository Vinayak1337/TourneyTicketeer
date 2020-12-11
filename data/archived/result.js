const Discord = require('discord.js');
const fs = require('fs');
// const initial = JSON.parse(fs.readFileSync('./data/database/initialRecord.csv','utf8'))['20G88CG2J'].members;
//     const final = JSON.parse(fs.readFileSync('./data/database/finalRecord.csv','utf8'))['20G88CG2J'].members;
//     const data = [];
//     for(let x=0; x<200; x++){
//         for(let i=0; i<200; i++){
//             if(final[x] && initial[i]){
//                 if(final[x].tag == initial[i].tag){
//                     const m = {};
//                     m.name = final[x].name;
//                     m.trophies = final[x].trophies;
//                     m.diff = final[x].trophies - initial[i].trophies;
//                     data.push(m);
//                 }
//         }
//     }
//     }
//     data.sort(function(a,b){ return a.diff - b.diff});
//     data.reverse();
//     for(let j=0; j<180; j++){
//         console.log(data[j]);
//     }
//     return;
module.exports.run = (Bot, msg, args) => {
    const initial = JSON.parse(fs.readFileSync('./data/database/initialRecord.csv','utf8'))['20G88CG2J'].members;
    const final = JSON.parse(fs.readFileSync('./data/database/finalRecord.csv','utf8'))['20G88CG2J'].members;
    const data = [];
    for(let x=0; x<100; x++){
        for(let i=0; i<100; i++){
            if(final[x] && initial[i]){
                if(final[x].tag == initial[i].tag){
                    const m = {};
                    m.name = final[x].name;
                    m.trophies = final[x].trophies;
                    m.diff = final[x].trophies - initial[i].trophies;
                    data.push(m);
                }
        }
    }
    }
    data.sort(function(a,b){ return a.diff - b.diff});
    data.reverse();
    for(let j=0; j<3; j++){
        console.log(data[j]);
    }
    return;

    // const em = new Discord.MessageEmbed()
    // .setAuthor(msg.guild.name,msg.guild.iconURL({dynamic:true}))
    // .setThumbnail(msg.guild.iconURL({dynamic: true}))
    // .setColor('#0004f7')
    // .setDescription('```yaml\nTrophy push winners - Season 2\n```Winners of last season Trophy push contest are the Top 3 from the list given below!\nA form will be sent into their DMs how will they claim their rewards!\nThanks for participating in last season!\nGood luck for this season!');
    // let x = 0, field = [], mem;
    // for(let i = 0; i<data.length; i++){
    //     if(x == 5){
    //         em.addField('\u200B',field.join('\n'));
    //         field = [];
    //         x = 0;
    //     }
    //     mem = `\`${i+1})\` **${data[i].name}** Pushed: **${data[i].diff}** Trophies: **${data[i].trophies}**`;
    //     field.push(mem);
    //     x++;
    // }
    // msg.channel.send('<@&656242829416333322>',em);
    // msg.delete();
}

module.exports.help = {
    name: 'result',
    description: 'Command file template!',
    aliases: []
}

module.exports.requirements = {
    userPerms: [],
    BotPerms: [],
    ownerOnly: true,
    adminOnly: false
}
