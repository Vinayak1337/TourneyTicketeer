module.exports = {
    getToken(Bot){
        let token;

        switch(Bot.apiInt){
            case 1:{
                Bot.apiInt++;
                token = Bot.tokens.token1;
            }break;

            case 2:{
                Bot.apiInt++;
                token = Bot.tokens.token2;
            }break;

            case 3:{
                Bot.apiInt++;
                token = Bot.tokens.token3;
            }break;

            case 4:{
                Bot.apiInt = 1;
                token = Bot.tokens.token4;
            }break;
        }
        return token;
    },
    checkCode(Bot,msg,tag,json){
        if(json == 503){
            msg.channel.send(Bot.errEm.setDescription('Brawl stars servers are under maintenance. Please try again later!').setFooter(`Status code ${json}`));
            return 'false';
        } 
        else if(json == 500){

        msg.channel.send(Bot.errEm.setDescription(`Something wrong happened while fetching the tag ${tag}. Please try again!`).setFooter(`Status code ${json}`));
        return 'false';    
    } 
        else if(json == 429){

        msg.channel.send(Bot.errEm.setDescription(`Something wrong happened while fetching the tag ${tag}.\n Please report this code **${json}** to our ${Bot.support}.`));
        return 'false';    
    }
        else if(json == 404){

         msg.channel.send(Bot.errEm.setDescription(`Club with given tag ${tag} not found or doesn't exist anymore! Try again with a correct tag.`).setFooter(`Status code ${json}`));
         return 'false';
        }
         else if(json == 403){
         msg.channel.send(Bot.errEm.setDescription(`Something wrong happened while fetching the tag ${tag}.\nPlease report this code **${json}** to our ${Bot.support}.`));
         return 'false';
        }
        else{
            return 'true';
        }
    },
    checkTag(tag){
        let allowed =  /^[0-9a-zA-Z]+$/;
        tag = tag.toUpperCase();
        if(tag.startsWith('#')){
            tag = tag.slice(1);
        }
        if(tag.match(allowed)){
            tag = tag.replace('O','0');
            tag = tag.replace('B','8');
            return tag;
        }else{
            tag = false;
            return tag;
        }
    }
}