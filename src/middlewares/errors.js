const elasticsearch = require('elasticsearch')

const errors = {
  ValidationError: 400,
  CastError: 400,
  AxiosError: 400,
  undefined: 500
}

function prepareLog (err, req) {
    err.req = req.query
    err.req.method = req.method
    err.req.url = req.url
    err.req.rawHeaders = req.rawHeaders
    err.req.headers = req.headers
    err.req.path = req.path
    err.req.ip = req.ip
    err.req.ips = req.ips
    return err
  }

module.exports = {
  async handler (err, req, res, next) {
    try {
      const client = new elasticsearch.Client({
          host: process.env.ELASTICSEARCH_URL
      })
      const error = prepareLog(err, req)
      await client.index({
          index: 'error_logs',
          type: 'currency_request',
          body: {
            error
          }
      })
      if (!(err.name in errors)) {
        res.status(500).send(err.message)
      } else {
        res.status(errors[err.name]).send(err.message)
      }
      } catch (err) {
        console.log(err)
      }
    }
}
