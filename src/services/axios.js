const environments = require('../environments')
const axios = require('axios')

module.exports = {

    apiLayer: new axios.create({
        headers: {
            apikey: environments.APIKEY,
            'Accept-Encoding': '*'
        }

    })
}
