const mongoose = require('mongoose');
// fields for example
const cryptocurrencySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type    : String, 
        required: true, 
        unique  : true
     },
    password: { type: String, required: true }
});

module.exports = mongoose.model('Cryptocurrency', cryptocurrencySchema, 'cryptocurrency');