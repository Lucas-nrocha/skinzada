const express = require('express');
const router = express.Router();
const skinsController = require('../controllers/skinsController');

router.get('/valores-ultimos-6-meses/:idSkin', skinsController.obterValoresUltimos6Meses);

module.exports = router;
