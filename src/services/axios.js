const environments = require('../environments')
const axios = require('axios')

module.exports = {

    apilayer: new axios.create({
        headers: {
            apikey: environments.APIKEY,
            'Accept-Encoding': '*'
        }

    })
}
