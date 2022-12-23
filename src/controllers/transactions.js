const service = require('../services')

module.exports = {
    async currencyConverter (req, res, next) {
        try {
            await service.transactions.currencyConverter(req, res)
        } catch (err) {
            next(err)
        }
    }
}
