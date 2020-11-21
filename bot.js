const { User } = require('discord.io');
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '#') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            //!ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                break;
            case 'werIstDerCoolste':
                bot.sendMessage({
                    to: channelID,
                    message: 'Eric! Wer sonst?'
                });
                break;
            case 'join':
                bot.sendMessage({
                    to: channelID,
                    message: "Try to join " +  user 
                });
                bot.joinVoiceChannel(user.channelID ,errorCallback(channelID));
                break;
            case 'hello':
                bot.sendMessage({
                    to: channelID,
                    message: "You are in channel " + getMemberObjectByUserID(userID, bot, channelID)
                });
                console.log()
            // Just add any case commands if you want to..
         }
     }
});

function errorCallback(channelID){
    bot.sendMessage({
        to: channelID,
        message: "Error"
    })
}

var member;
function getMemberObjectByUserID(userID, bot, channelID){
    console.log("UserID: " +  userID)
    bot.getMember({
        serverID: "375371607352541184",
        userID: userID
    }, memberSender);
    return member
}

function memberSender(error, response){
    member = response
    console.log(member)
}