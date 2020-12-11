module.exports = (Bot, error) => {
    if(error){
        console.log(error);
        return Bot.channels.cache.get('755702553790120007').send(Bot.errEm.setDescription(`Error: \`\`\`js\n${error.name}: ${error.message}\n${error.code}\n\`\`\``));
    }
}
