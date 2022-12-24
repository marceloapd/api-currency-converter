const errors = {
  ValidationError: 400,
  CastError: 400,
  AxiosError: 400
}

  module.exports = {
      handler (err, req, res, next) {
          res.status(errors[err.name]).send(err.message)
        }
  }
