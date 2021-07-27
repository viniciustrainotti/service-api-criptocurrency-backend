const express = require('express');
const router = express.Router();

const cryptocurrencyRoutes = require('./cryptocurrencyRoutes');

// router.get('/', function(req, res) {
//     res.status(200).json({'hello': 'world'});
// });

router.use('/cryptocurrency', cryptocurrencyRoutes);
 
module.exports = router;