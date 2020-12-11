const fs = require('fs');
module.exports = {
    getIcon(brawlerCode){
        const emotes = JSON.parse(fs.readFileSync('./data/database/emojis.csv','utf8')).brawlerEmotes;
        let code = brawlerCode.toString().slice(6);
        parseInt(code);
        return emotes[code];
     }
}