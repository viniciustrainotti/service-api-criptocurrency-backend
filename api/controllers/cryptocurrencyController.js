const { default: axios } = require('axios');
const mongoose = require('mongoose');

const PATH_API = process.env.PATH_API || '';

const Cryptocurrency = require('../models/cryptocurrencyModel');
const HistoryCryptocurrency = require('../models/historycriptocurrencyModel');

class oCryptocurrency{
    async healthz(req, res, next){
        //res.status(200).json({ 'hello': 'world'});
        try {
            const response = await axios.get(PATH_API + '/ping');
            //console.log(response);
            res.status(200).send(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async getIdsCriptocurrency(req, res, next){
        try {
            const response = await axios.get(PATH_API + '/coins/list');
            //console.log(response);
            res.status(200).send(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async getPriceCriptocurrency(req, res, next){
        const coins         = req.params.coins;
        const vs_currencies = req.params.vs_currencies;
        
        //https://api.coingecko.com/api/v3/simple/price?ids=ethereum,brcp-token,bitcoin&vs_currencies=brl
        try {
            const response = await axios.get(PATH_API + '/simple/price?ids=' + coins + '&vs_currencies=' + vs_currencies);
            //console.log(response);
            res.status(200).json(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async save(req, res, next){
        console.log('req.body', req.body);
        const criptocurrency = req.body.criptocurrency ? req.body.criptocurrency : '';
        const symbol = req.body.symbol ? req.body.symbol: '';
        let response = {};
        console.log('cripto', criptocurrency);

        if (criptocurrency == '' && symbol == ''){
            response = { 'status': 403, 'data': { 'message' :'It\'s req body parse empty' } }
        }else{
            const paramsNewCriptocurrencyObject = {
                _id: new mongoose.Types.ObjectId(),
                criptocurrency: req.body.criptocurrency,
                symbol: req.body.symbol,
            }
    
            const newCriptocurrencyObject = new Cryptocurrency(paramsNewCriptocurrencyObject);
            try {
                let returnData = await newCriptocurrencyObject.save();
                response = { 'status': 200, 'data': { 'message': returnData }}
            } catch (error) {
                console.log('save error', error);
                response = { 'status': 500, 'data': { 'message' : error } }
            }
        }
        console.log('response', response);
        res.status(response.status).json(response.data);
    }

    async getAllCriptocurrencyPrices(req, res, next){
        let response = {};
        let concatSymbolsCriptocurrency = '';
        try {

            const returnData = await Cryptocurrency.find({'status': '1'});
            for (let obj in returnData){
                console.log('obj', returnData[obj].symbol);
                concatSymbolsCriptocurrency += returnData[obj].symbol + ',';
            }
            console.log('concat', concatSymbolsCriptocurrency.substr(0, concatSymbolsCriptocurrency.length-1));
            const coins = concatSymbolsCriptocurrency.substr(0, concatSymbolsCriptocurrency.length-1);
            const vs_currencies = 'brl';
            console.log('URI', PATH_API + '/simple/price?ids=' + coins + '&vs_currencies=' + vs_currencies);
            const reposta = await axios.get(PATH_API + '/simple/price?ids=' + coins + '&vs_currencies=' + vs_currencies);
            console.log('RESPOSTA', reposta.data);
            const timeElapsed = Date.now();
            var today = new Date(timeElapsed);
            //const timeInMs = new Date();
            var timInMsFormat = today.toISOString();
            for (let obj in reposta.data){
                console.log('obj reposta', reposta.data[obj].brl);
                const paramsNewHistoryCriptocurrencyObject = {
                    _id: new mongoose.Types.ObjectId(),
                    symbol: obj,
                    price: reposta.data[obj].brl,
                    date: timeElapsed,
                    dateFormat: timInMsFormat
                }
                console.log('paramsNewHistoryCriptocurrencyObject', paramsNewHistoryCriptocurrencyObject);

                const newHistoryCriptocurrencyObject = new HistoryCryptocurrency(paramsNewHistoryCriptocurrencyObject);
                try {
                    let returnNewHistoryCriptocurrencyObject = await newHistoryCriptocurrencyObject.save();
                    //response = { 'status': 200, 'data': { 'message': returnData }}
                    console.log('save new history', returnNewHistoryCriptocurrencyObject);
                } catch (error) {
                    console.log('save error', error);
                    response = { 'status': 500, 'data': { 'message' : error } }
                }
            }
            response = { 'status': 200, 'data': { 'message': reposta.data }}
            console.log('return', returnData);
        } catch (error) {
            console.log('save error', error);
            response = { 'status': 500, 'data': { 'message' : error } }
        }

        res.status(response.status).json(response.data);
    }
}

module.exports = new oCryptocurrency;