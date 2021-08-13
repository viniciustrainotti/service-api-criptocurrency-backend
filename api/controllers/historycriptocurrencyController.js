const mongoose = require('mongoose');
const env = require('../../.env');

const { Telegraf } = require('telegraf');

const bot = new Telegraf(env.token);

const HistoryCryptocurrency = require('../models/historycriptocurrencyModel');

self = {}

class oHistoryCriptocurrency{
    constructor(){
        self = this
    }
    async all(req, res, next){
        let response = {}
        var from_date = self.formatHoursMinutesSeconds();

        try {
            const returnData = await HistoryCryptocurrency.find({ 'date': {"$gte": from_date}});
            for(let coin of returnData){
                let date = self.dataAtualFormatada(coin.date);
                let price = coin.price.toLocaleString('pt-br', {minimumFractionDigits: 2});
                console.log('date', date);
                //console.log('date format', date);
                let messageBot = 'Data: '
                                + date
                                + '\n'
                                + 'Criptomoeda: '
                                + coin.symbol
                                + '\n' 
                                + 'Preço: R$ '
                                + price
                                +'\n\n';
                console.log('messageBot', messageBot);
                bot.telegram.sendMessage("-497749810", messageBot);
            }
            response = { 'status': 200, 'data': { 'message' : returnData } }
        } catch (error) {
            console.log('history all error', error);
            response = { 'status': 500, 'data': { 'message' : error } }
        }
        
        res.status(response.status).json(response.data);
    }

    formatHoursMinutesSeconds(){
        let date = new Date();
        date.setHours(0, 0, 0, 0);
        return date;
    }

    dataAtualFormatada(date){
        var data = new Date(date),
            dia  = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = data.getFullYear();
        return diaF+"/"+mesF+"/"+anoF;
    }
}

module.exports = new oHistoryCriptocurrency;