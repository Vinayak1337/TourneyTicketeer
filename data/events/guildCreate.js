const fs = require('fs');
const Discord = require('discord.js');

module.exports = (Bot, guild) => {
// Bot.channels.cache.get('755702453197865022').send(new Discord.MessageEmbed().setDescription(`Added in guild: ${guild.name}\nMembers: ${guild.members.cache.size}\nOwner: ${guild.owner.tag}`).setThumbnail(guild.iconURL({dynamic:true}).setColor('BLUE')));
// console.log(guild.name);
//     let data = JSON.parse(fs.readFileSync('./data/database/serversPremium.csv','utf8'));
//     let pdata = JSON.parse(fs.readFileSync('./data/database/playersPremium.csv','utf8'));
//     if(!data[guild.id]){
//         data[guild.id] = {
//             premium: false
//         }
//     }
//     else{
//         if(!data[guild.id].premium){
//             data[guild.id].premium = false;
//         }
//     }
//     guild.members.cache.forEach(m => {
//         if(!pdata[m.id]){
//             pdata[m.id] = {
//                 premium: false
//             }
//         }
//         else{
//             if(!pdata[m.id].premium){
//                 pdata[m.id].premium = false;
//             }
//         }
//     })
//     fs.writeFile('./data/database/serversPremium.csv',JSON.stringify(data), error =>{
//         if(error){
//             console.log(error);
//         }
//     })
//     fs.writeFile('./data/database/playersPremium.csv',JSON.stringify(pdata), error =>{
//         if(error){
//             console.log(error);
//         }
//     });
    return;
}