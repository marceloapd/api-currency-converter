const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/currency', routes.transactions)

module.exports = app
