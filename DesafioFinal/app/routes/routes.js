const express = require('express');
const transactionRouter = express.Router();
const service = require('../services/transactionService.js');

transactionRouter.get('/', service.findPeriod);
transactionRouter.get('/periods/', service.getPeriods);

module.exports = transactionRouter;
