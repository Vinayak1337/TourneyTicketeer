const fs = require('fs');

module.exports = {
    getEmote(Bot,type,iconID){
        let emotes = JSON.parse(fs.readFileSync('./data/database/emojis.csv','utf8')).playerIcon;
        let emotes2 = JSON.parse(fs.readFileSync('./data/database/emojis.csv','utf8')).brawlerEmotes;
        let links = JSON.parse(fs.readFileSync('./data/database/emojis.csv','utf8')).playerIconLinks;
        iconID = iconID.toString().slice(6);
        if(iconID.startsWith('0')){
            iconID = iconID.slice(1);
        }
        if(iconID < 16){
            if(type == 'link'){
                return links[iconID];
            }else if(type == 'emote'){
                return emotes[iconID];
            }else{
                return false;
            }
        }else{
            if(type == 'link'){
                let id = emotes2[iconID-16].split(':')[2].split('>')[0];
                let emote = Bot.emojis.cache.get(id);
                if(emote){
                    return emote.url;
                }else{
                    return false;
                }
            }else if(type == 'emote'){
                return emotes2[iconID-16];
            }else{
                return false;
            }
        }
    }
}