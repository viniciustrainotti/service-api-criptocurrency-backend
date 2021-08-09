const mongoose = require('mongoose');
// fields for example
const cryptocurrencySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    criptocurrency: { 
        type    : String, 
        required: true
    },
    symbol: { 
        type    : String, 
        required: true,
        unique: true
    },
    status: {
        type : String,
        required: false,
        default : '1'
    }
});

module.exports = mongoose.model('Cryptocurrency', cryptocurrencySchema, 'cryptocurrency');