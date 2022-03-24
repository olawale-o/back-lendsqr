const express = require('express');
const router = express.Router();
const transactionController = require('../../controllers/transactions_controller');

router.post('/transfer', transactionController.transfer);

module.exports = router;
