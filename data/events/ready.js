const Discord = require('discord.js');
const fs = require('fs');

module.exports = (Bot) => {
//     let data = JSON.parse(fs.readFileSync('./data/database/serversPremium.csv','utf8'));
//     let pdata = JSON.parse(fs.readFileSync('./data/database/playersPremium.csv','utf8'));
//     Bot.guilds.cache.forEach(guild => {
//     if(!data[guild.id]){
//         data[guild.id] = {
//             premium: false
//         }
//     }
//     else{
//         if(data[guild.id] && !data[guild.id].premium){
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
//     })
// })

console.log(`Logged in as ${Bot.user.tag}`);
Bot.botReady = true;
Bot.user.setPresence({status: 'online', activity:{name: `Under construction`, type: 'WATCHING'}});
}