const env = require('../../.env');
const { Telegraf } = require('telegraf');

const bot = new Telegraf(env.token);

class oBotTelegram {

    hello(req, res, next){

        bot.telegram.sendMessage("-497749810", "Teste Group Telegram with All Member");

        res.status(200).json({ message: "Hello World!"});
    }

}

module.exports = new oBotTelegram;