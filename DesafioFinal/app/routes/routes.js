const express = require('express');
const transactionRouter = express.Router();
const service = require('../services/transactionService.js');

transactionRouter.get('/', service.findPeriod);
transactionRouter.get('/periods/', service.getPeriods);
transactionRouter.post('/', service.insert);
transactionRouter.delete('/:id', service.delete);
transactionRouter.put('/', service.update);

module.exports = transactionRouter;
