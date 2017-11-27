var builder = require('botbuilder');

var connector = new builder.ConsoleConnector().listen();

var bot = new builder.UniversalBot(connector);

// 1. Simple Hello Bot example . To run the Bot , type node app in command prompt
/* bot.dialog('/', function(session) {
    session.send('Hello Bot - my first bot example');
}); */

// 2. Hello Bot Example with Dialogs
/* bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session, 'Hi ! what is your name');
    },
    function (session, results) {
        session.send('Hello %s', results.response);
    }
]); */


// 3. Hello Bot Example with Dialog and Adding Memory
bot.dialog('/', [
    function (session, args, next) {
        if(!session.userData.name) {
            session.beginDialog('/ask_name');
        } else {
            next();
        }
    },
    function (session) {
        session.send('Hello %s', session.userData.name);
    }
]);

bot.dialog('/ask_name', [
    function (session) {
        builder.Prompts.text(session, 'Hi ! what is your name');
    },
    function (session, results) {
        session.userData.name = results.response;
        session.endDialog();
    }
]);