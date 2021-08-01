const { default: axios } = require('axios');
const mongoose = require('mongoose');

const PATH_API = process.env.PATH_API || '';

const Cryptocurrency = require('../models/cryptocurrencyModel');

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
}

module.exports = new oCryptocurrency;