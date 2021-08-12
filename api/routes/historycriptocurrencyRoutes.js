const express = require('express');
const router = express.Router();

const historycriptocurrencyController = require('../controllers/historycriptocurrencyController');

router.get('/all' , historycriptocurrencyController.all);

module.exports = router;