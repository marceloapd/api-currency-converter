const models = require('../models')

module.exports = {
    async persistTransactions (request) {
        const transactionsInsert = await models.transactions.create({
            user_id: request.user_id,
            origin_currency: request.data.query.from,
            destination_currency: request.data.query.to,
            origin_value: request.data.query.amount,
            destination_value: request.data.result,
            conversion_rate: request.data.info.rate,
            date: request.data.date
        })
        return transactionsInsert
    },
    async getTransactionsById (id) {
        const transactions = await models.transactions.find({ user_id: id })
        return transactions
    }
}
