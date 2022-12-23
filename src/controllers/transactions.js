const service = require('../services')

module.exports = {
    async currencyConverter (req, res, next) {
        try {
            await service.transactions.currencyConverter(req, res, next)
        } catch (err) {
            next(err)
        }
    },
    async listTransactions (req, res, next) {
        try {
            await service.transactions.listTransactions(req, res, next)
        } catch (err) {
            next(err)
        }
    }
}
