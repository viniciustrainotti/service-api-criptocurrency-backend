const express = require('express');
const router = express.Router();

const cryptocurrencyController = require('../controllers/cryptocurrencyController');

router.get('/healthz'                     , cryptocurrencyController.healthz);
router.get('/all_ids_criptocurrency'      , cryptocurrencyController.getIdsCriptocurrency);
router.get('/price/:coins/:vs_currencies' , cryptocurrencyController.getPriceCriptocurrency);
router.post('/save'                       , cryptocurrencyController.save);
router.get('/all', cryptocurrencyController.getAllCriptocurrencyPrices);

//router.post('/signup' , criptoController.userSignup);

module.exports = router;