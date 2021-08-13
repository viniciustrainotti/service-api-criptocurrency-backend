const express = require('express');
const router = express.Router();

const botTelegramController = require('../controllers/botTelegramController');

router.get('/hello'                     , botTelegramController.hello);
//router.post('/signup' , criptoController.userSignup);

module.exports = router;