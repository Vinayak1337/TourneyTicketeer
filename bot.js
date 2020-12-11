const settings = require('./data/keys/settings');
const tokens = require('./data/keys/tokens');
const Discord = require('discord.js');
const Bot = client = new Discord.Client({
    shards:"auto",
    messageCacheMaxSize: 10,
    messageCacheLifetime: 86400,
    fetchAllMembers: true,
    retryLimit: 3,
    
});

const errEm = new Discord.MessageEmbed().setColor('#ff002b');
const quesEm = new Discord.MessageEmbed().setColor('RANDOM');
const sucEm = new Discord.MessageEmbed().setColor('#0022ff');
const em = new Discord.MessageEmbed().setColor('#000fe6');

Bot.commands = new Discord.Collection();
Bot.aliases = new Discord.Collection();
Bot.limits = new Map();
Bot.runningCommand = new Map();
Bot.settings = settings;
Bot.errEm = errEm;
Bot.quesEm = quesEm;
Bot.sucEm = sucEm;
Bot.em = em;
Bot.apiInt = 1;
Bot.tokens = tokens;
Bot.support = '[support server](https://discord.gg/UkjaeTW)';
Bot.invite = 'https://discord.com/api/oauth2/authorize?client_id=714763717874679871&permissions=8&scope=bot';

Bot.botReady = false;

const commands = require('./data/structures/command');
commands.run(Bot);

const events = require("./data/structures/event");
events.run(Bot);


Bot.login(settings.tokenFirst).then(g => {
    Bot.user.setPresence({status: 'online', activity:{name: `Loading Commands & Events, please wait!`, type: 'PLAYING'}});
});