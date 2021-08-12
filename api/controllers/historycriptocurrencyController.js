const mongoose = require('mongoose');

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
            response = { 'status': 200, 'data': { 'message' : returnData } }
        } catch (error) {
            console.log('save error', error);
            response = { 'status': 500, 'data': { 'message' : error } }
        }
        
        res.status(response.status).json(response.data);
    }

    formatHoursMinutesSeconds(){
        let date = new Date();
        date.setHours(0, 0, 0, 0);
        return date;
    }
}

module.exports = new oHistoryCriptocurrency;