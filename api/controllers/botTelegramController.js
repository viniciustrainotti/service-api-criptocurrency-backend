const { Telegraf } = require('telegraf');

const TELEGRAM_API_TOKEN = process.env.TELEGRAM_API_TOKEN ? process.env.TELEGRAM_API_TOKEN : '';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID ? process.env.TELEGRAM_CHAT_ID : '';

const bot = new Telegraf(TELEGRAM_API_TOKEN);

class oBotTelegram {

    hello(req, res, next){

        bot.telegram.sendMessage(TELEGRAM_CHAT_ID, "Teste Group Telegram with All Member");

        res.status(200).json({ message: "Hello World!"});
    }

}

module.exports = new oBotTelegram;