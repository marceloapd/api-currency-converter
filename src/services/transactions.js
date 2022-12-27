const axios = require('./axios')
const repository = require('../repository')

function prepareData (obj) {
    return {
        transaction_id: obj._id,
        user_id: obj.user_id,
        origin_currency: obj.origin_currency,
        origin_value: obj.origin_value,
        destination_currency: obj.destination_currency,
        destination_value: obj.destination_value,
        conversion_rate: obj.conversion_rate,
        date: obj.date
    }
}

module.exports = {
    async currencyConverter (req, res) {
        const request = await axios.apiLayer.get(`https://api.apilayer.com/exchangerates_data/convert?to=${req.query.to}&from=${req.query.from}&amount=${req.query.amount}`)
        request.data.user_id = req.query.user_id
        const persistTransaction = await repository.transactions.persistTransactions(request)
        if (request.status === 200) {
            const data = prepareData(persistTransaction)
            res.send(data)
        }
    },

    async listTransactions (req, res) {
        const transactions = await repository.transactions.getTransactionsById(req.query.user_id)
        if (transactions.length === 0) {
            res.send(`no transactions for user_id: ${req.query.user_id}`)
        } else {
            transactions.forEach((element, index) => {
                transactions[index] = prepareData(element)
            })
            res.send(transactions)
        }
    }
}
