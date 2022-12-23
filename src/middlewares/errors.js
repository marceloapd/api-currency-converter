const errors = {
    ValidationError: 400,
    CastError: 400
  }

  module.exports = {
      handler (err, req, res, next) {
          console.log(err.message)
          res.status(errors[err.name]).send(err.message)
        }
  }
