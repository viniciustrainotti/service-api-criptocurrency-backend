const express = require('express');
const router = express.Router();

const cryptocurrencyController = require('../controllers/cryptocurrencyController');

router.get('/hello'   , cryptocurrencyController.hello);
//router.post('/signup' , criptoController.userSignup);

module.exports = router;