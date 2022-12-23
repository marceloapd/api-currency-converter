const mongoose = require('mongoose')
const environments = require('../environments')

mongoose.connect(environments.MONGODB)
mongoose.Promise = global.Promise

module.exports = mongoose
