const mongoose = require('mongoose');
// fields for example
const historyCriptoCurrencySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    symbol: { 
        type    : String, 
        required: true
    },
    price: { 
        type    : Number, 
        required: true,
    },
    date: {
        type : Date,
        required: false,
    },
    dateFormat: {
        type : Date,
        required: false,
    }
});

module.exports = mongoose.model('HistoryCryptocurrency', historyCriptoCurrencySchema, 'historycryptocurrency');