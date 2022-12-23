const mongoose = require('../database')

const TransactionsSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        require: true
    },
    origin_currency: {
        type: String,
        require: true
    },
    origin_value: {
        type: Number,
        require: true
    },
    destination_currency: {
        type: String,
        require: true
    },
    destination_value: {
        type: Number,
        require: true
    },
    conversion_rate: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Transactions = mongoose.model('Transactions', TransactionsSchema)

module.exports = Transactions
