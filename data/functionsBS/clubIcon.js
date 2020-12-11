const fs = require('fs');
module.exports = {
    getEmote(Bot,type,iconID){
        let emotes = JSON.parse(fs.readFileSync('./data/database/emojis.csv','utf8')).clubIcon;
        iconID = iconID.toString().slice(5);
        if(iconID.startsWith('0')){
            iconID = iconID.slice(1);
        }
        if(type == 'link'){
            let id = emotes[iconID].split(':')[2].split('>')[0];
            let emote = Bot.emojis.cache.get(id);
            if(emote){
                return emote.url;
            }else{
                return false;
            }
        }else if(type == 'emote'){
            return emotes[iconID];
        }else{
            return false;
        }
    }
}