const express = require('express');
const router = express.Router();

const cryptocurrencyRoutes = require('./cryptocurrencyRoutes');
const historycriptocurrencyRoutes = require('./historycriptocurrencyRoutes');

// router.get('/', function(req, res) {
//     res.status(200).json({'hello': 'world'});
// });

router.use('/cryptocurrency'        , cryptocurrencyRoutes);
router.use('/historycriptocurrency' , historycriptocurrencyRoutes);
 
module.exports = router;