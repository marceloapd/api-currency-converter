const router = require('express').Router()
const controllers = require('../controllers')

router.get('/converter', controllers.transactions.currencyConverter)
router.get('/list-transactions', controllers.transactions.listTransactions)

module.exports = router
