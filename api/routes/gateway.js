const express = require('express');
const router = express.Router();

const cryptocurrencyRoutes = require('./cryptocurrencyRoutes');
const historycriptocurrencyRoutes = require('./historycriptocurrencyRoutes');
const botTelegramRoutes = require('./botTelegramRoutes');

// router.get('/', function(req, res) {
//     res.status(200).json({'hello': 'world'});
// });

router.use('/cryptocurrency'        , cryptocurrencyRoutes);
router.use('/historycriptocurrency' , historycriptocurrencyRoutes);
router.use('/bot_telegram'          , botTelegramRoutes);
 
module.exports = router;