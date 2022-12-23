const router = require('express').Router()
const controllers = require('../controllers')

router.get('/converter', controllers.transactions.currencyConverter)

module.exports = router
