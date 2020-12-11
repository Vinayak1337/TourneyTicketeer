const Discord = require('discord.js');
const fs = require('fs');
const fetch = require('node-fetch');
const brawlApi = require('../functionsBS/brawlAPI');
module.exports.run = (Bot, msg, args) => {
    if(!['359223782747144192','149626954113351680'].includes(msg.author.id)) return;
    (async() => {
        const token = brawlApi.getToken(Bot);
        const response = await fetch('https://api.brawlstars.com/v1/clubs/%23VR2RJQYY',{
            method: 'GET',
            headers: {
                'content-Type': 'application/json',
                'authorization': 'Bearer '+token
            }
        });
        const club = await response.json();
        for(let x=0; x<club.members.length; x++){
            task(x);
        }
        const data = [];
        function task(x){
            setTimeout(function(){
                (async() => {
                    const token = brawlApi.getToken(Bot);
                    const response = await fetch(`https://api.brawlstars.com/v1/players/%23${club.members[x].tag.slice(1)}`,{
                        method: 'GET',
                        headers: {
                            'content-Type': 'application/json',
                            'authorization': 'Bearer '+token
                        }
                    });
                    const player = await response.json();
                    const obj = {};
                    obj.name = player.name;
                    obj.tag = player.tag;
                    obj.trophies = player.trophies;
                    obj.trio_victories = player['3vs3Victories'];
                    data.push(obj);
                    if(data.length == club.members.length){
                        console.log(data.length);
                        fs.writeFile('./royale.json',JSON.stringify(data), function(err){
                            if(err) throw err;
                            msg.channel.send({
                                files: [{
                                  attachment: './royale.json',
                                  name: 'royale.json'
                                }]
                              })
                                .catch(console.error);
                        })
                    }
                })();
            },50);
        }
    })();
}
module.exports.help = {
    name: 'royale',
    description: 'Command file template!',
    usage: 'usage of the command',
    module: '',
    aliases: []
    //command name identifier
}

module.exports.requirements = {
    userPerms: [],
    BotPerms: [],
    ownerOnly: false,
    adminOnly: false
    //Requirements
}

