const mongoose = require('mongoose');

const Cryptocurrency = require('../models/cryptocurrencyModel');

class oCryptocurrency{
    hello(req, res, next){
        res.status(200).json({ 'hello': 'world'});
    }
}

module.exports = new oCryptocurrency;