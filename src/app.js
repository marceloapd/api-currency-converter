const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const bodyParser = require('body-parser')
const middlewares = require('./middlewares')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/currency', routes.transactions)

app.use(middlewares.errors.handler)

module.exports = app
