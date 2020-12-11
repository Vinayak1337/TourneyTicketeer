const fs = require('fs');
module.exports = {
    getIcon(trophies){
        let emotes = JSON.parse(fs.readFileSync('./data/database/emojis.csv','utf8')).trophyEmotes;
        parseInt(trophies);
        if(trophies < 500) return emotes[0];
        else if(trophies < 1000 && trophies >= 500){
            const obj = {};
            let rank;
            if(trophies < 650){
                rank = '\`I\`';
            }
            else if(trophies >= 650 && trophies < 800){
                rank = '\`II\`';
            }
            else if(trophies < 1000 && trophies >= 800){
                rank = '\`III\`';
            }
            obj.rank = rank;
            obj.emote = emotes[1];
            return obj;
            
        }
        else if(trophies < 2000 && trophies >= 1000){
            const obj = {};
            let rank;
            if(trophies < 1300){
                rank = '\`I\`';
            }
            else if(trophies >= 1300 && trophies < 1600){
                rank = '\`II\`';
            }
            else if(trophies < 2000 && trophies >= 1600){
                rank = '\`III\`';
            }
            obj.rank = rank;
            obj.emote = emotes[2];
            return obj;
        }
        else if(trophies >= 2000 && trophies < 3000){
            const obj = {};
            let rank;
            if(trophies < 2300){
                rank = '\`I\`';
            }
            else if(trophies >= 2300 && trophies < 2600){
                rank = '\`II\`';
            }
            else if(trophies >= 2600 && trophies < 3000){
                rank = '\`III\`';
            }
            obj.rank = rank;
            obj.emote = emotes[3];
            return obj;
        }
        else if(trophies >= 3000 && trophies < 4000){
            const obj = {};
            let rank;
            if(trophies < 3300){
                rank = '\`I\`';
            }
            else if(trophies >= 3300 && trophies < 3600){
                rank = '\`II\`';
            }
            else if(trophies >= 3600 && trophies < 4000){
                rank = '\`III\`';
            }
            obj.rank = rank;
            obj.emote = emotes[4];
            return obj;
        }
        else if(trophies >= 4000 && trophies < 6000){
            const obj = {};
            let rank;
            if(trophies < 4500){
                rank = '\`I\`';
            }
            else if(trophies >= 4500 && trophies < 5000){
                rank = '\`II\`';
            }
            else if(trophies >= 5000 && trophies < 5500){
                rank = '\`III\`';
            }
            else if(trophies >= 5500 && trophies < 6000){
                rank = '\`IV\`';
            }
            obj.rank = rank;
            obj.emote = emotes[5];
            return obj;
        }
        else if(trophies >= 6000 && trophies < 8000){
            const obj = {};
            let rank;
            if(trophies < 6500){
                rank = '\`I\`';
            }
            else if(trophies >= 6500 && trophies < 7000){
                rank = '\`II\`';
            }
            else if(trophies >= 7000 && trophies < 7500){
                rank = '\`III\`';
            }
            else if(trophies >= 7500 && trophies < 8000){
                rank = '\`IV\`';
            }
            obj.rank = rank;
            obj.emote = emotes[6];
            return obj;
        }
        else if(trophies >= 8000 && trophies < 10000){
            const obj = {};
            let rank;
            if(trophies < 8500){
                rank = '\`I\`';
            }
            else if(trophies >= 8500 && trophies < 9000){
                rank = '\`II\`';
            }
            else if(trophies >= 9000 && trophies < 9500){
                rank = '\`III\`';
            }
            else if(trophies >= 9500 && trophies < 10000){
                rank = '\`IV\`';
            }
            obj.rank = rank;
            obj.emote = emotes[7];
            return obj;
        }
        else if(trophies >= 10000 && trophies < 16000){
            const obj = {};
            let rank;
            if(trophies < 11000){
                rank = '\`I\`';
            }
            else if(trophies >= 11000 && trophies < 12000){
                rank = '\`II\`';
            }
            else if(trophies >= 12000 && trophies < 13000){
                rank = '\`III\`';
            }
            else if(trophies >= 13000 && trophies < 14000){
                rank = '\`IV\`';
            }
            else if(trophies >= 14000 && trophies < 16000){
                rank = '\`V\`';
            }
            obj.rank = rank;
            obj.emote = emotes[8];
            return obj;
        }
        else if(trophies >= 16000 && trophies < 30000){
            const obj = {};
            let rank;
            if(trophies < 18000){
                rank = '\`I\`';
            }
            else if(trophies >= 18000 && trophies < 20000){
                rank = '\`II\`';
            }
            else if(trophies >= 20000 && trophies < 22000){
                rank = '\`III\`';
            }
            else if(trophies >= 22000 && trophies < 25000){
                rank = '\`IV\`';
            }
            else if(trophies >= 25000 && trophies < 30000){
                rank = '\`V\`';
            }
            obj.rank = rank;
            obj.emote = emotes[9];
            return obj;
        }
        else if(trophies >= 30000 && trophies < 49999){
            const obj = {};
            let rank;
            if(trophies < 35000){
                rank = '\`I\`';
            }
            else if(trophies >= 35000 && trophies < 40000){
                rank = '\`II\`';
            }
            else if(trophies >= 40000 && trophies < 45000){
                rank = '\`III\`';
            }
            else if(trophies >= 45000 && trophies < 49999){
                rank = '\`IV\`';
            }
            obj.rank = rank;
            obj.emote = emotes[10];
            return obj;
        }
        else if(trophies >= 50000){
           const obj = {};
           obj.rank = '\`I\`';
           obj.emote = emotes[11];
           return obj;
        }
    }
}