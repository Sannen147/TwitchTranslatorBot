const tmi = require('tmi.js')
const translate = require('translation-google');
const fs = require('fs');

var config = GetJson();

/*   CONFIGURATIONS
----------------------------------------------------------------------------------------------------------------------------------------------------------------
Here are some configs about the bot, you can choose the preferred languages and etc, i'll probably make this more user friendly later lol
*/

const Ch = config.Channel; //change this to change the channel in which the bot will work

const First_language = config.Languages.first; //this will translate every language into this one except itself

const Second_language = config.Languages.second; //when someone talks in your first language, it will get translated into this one (if you don't have a second one, just use the same language)

var options = {
    options:{
        debug: true,
    },
    connection: {
        cluster: 'aws',
        reconnect: true,
    },
    identity: {
        username: GetUser(), //username of the bot's twitch account
        password: GetPass(), //password of the bot which you can get in https://twitchapps.com/tmi/ while logged into the bot's account
    },
    channels: [Ch],
};
/* 
----------------------------------------------------------------------------------------------------------------------------------------------------------------
*/

var client = new tmi.Client(options);

client.connect();

client.on('connected', (address, port) => { //shows if it connects or not (change the msg if you want lol)
    console.log('connected to chat :)');
});

client.on('chat', (channel, userstate, message, self) => { //detects a message in the chat
    if(client.isMod(Ch, userstate.username) == 1 && message == "-fix"){ 
        fix_bot();
    }else{
        translate(message, {to: First_language}).then(res => {
            var from_ln = res.from.language.iso;

            if(from_ln == First_language){
                translate(message, {to: Second_language}).then(res => {
                    var trans_text = res.text;
                    var msg = trans_text + " (" + from_ln + " => en)";
                    client.action(Ch, msg);
                }).catch(err => {
                    console.error(err);
                });
            }else{
                var trans_text = res.text;
                var msg = trans_text + " (" + from_ln + " => ja)";
                client.action(Ch, msg);
            }
        }).catch(err => {
            console.log(err);
            fix_bot();
        });
    }
})


function GetJson(){ //gets info from the JSON
    let rawdata = fs.readFileSync('configs.json');
    let configs = JSON.parse(rawdata);
    return configs;
}

function fix_bot(){ //this restarts the app with nodemon
    var config = GetJson();

    if(config.status == 1){
        config.status = 0;
    }else if(config.status == 0){
        config.status = 1;
    }else{
        console.log("Status Error")
    }
    
    let data = JSON.stringify(config, null, 2);
    fs.writeFileSync('configs.json', data);
}


function GetUser(){ //gets the username from the JSON
    var config = GetJson();
    var returnable;

    if(config.status == 1){
        returnable = config.Account1.user;
    }else if(config.status == 0){
        returnable = config.Account2.user;
    }else{
        console.log("Status Error")
    }

    return returnable; //lol
}

function GetPass(){ //gets the pass from the JSON
    var config = GetJson();
    var returnable;

    if(config.status == 1){
        returnable = config.Account1.Auth;
    }else if(config.status == 0){
        returnable = config.Account2.Auth;
    }else{
        console.log("Status Error")
    }
    
    return returnable;// lol x2
}
