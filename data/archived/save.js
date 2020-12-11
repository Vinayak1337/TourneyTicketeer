const Discord = require('discord.js');

module.exports.run = (Bot, msg, args) => {
    const fs = require('fs');
    const fetch = require('node-fetch');
    let tag = '20G88CG2J';
    let tag2 = 'VR2RJQYY';
    const tokener = require('../functionsBS/brawlAPI');
    const data = JSON.parse(fs.readFileSync('./data/database/save.csv','utf8'));
    const data2 = JSON.parse(fs.readFileSync('./data/database/save2.csv','utf8'));

    let token = tokener.getToken(Bot);
    fetch('https://api.brawlstars.com/v1/clubs/%23'+tag,{
            method: 'GET',
            headers: {
                'content-Type': 'application/json',
                'authorization': 'Bearer '+token
            }
        }).then(res => {
            let status = res.status;
            if(status == 200){
                return res.json();
            }
            else {
            return status;
            }
        })
        .then(json => {
            data[tag] = {
                valiant: json
            }
            fs.writeFileSync('./data/database/save.csv',JSON.stringify(data),(err) => {
                if(err){
                    console.log(err);
                }
            })
        })
        fetch('https://api.brawlstars.com/v1/clubs/%23'+tag2,{
            method: 'GET',
            headers: {
                'content-Type': 'application/json',
                'authorization': 'Bearer '+token
            }
        }).then(res => {
            let status = res.status;
            if(status == 200){
                return res.json();
            }
            else {
            return status;
            }
        })
        .then(json => {
            data2[tag] = {
                valiant: json
            }
            fs.writeFileSync('./data/database/save.csv',JSON.stringify(data2),(err) => {
                if(err){
                    console.log(err);
                }
            })
        })
}
module.exports.help = {
    name: 'save',
    description: 'Command file template!',
    usage: 'usage of the command',
    module: '',
    aliases: []
}

module.exports.requirements = {
    userPerms: [],
    BotPerms: [],
    ownerOnly: true,
    adminOnly: false
}
