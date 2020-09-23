const CustomError = require('../../helpers/error/CustomError');

const errorHandler = (err, req, res, next) => {
  const error = new CustomError(
    err.status,
    err.message || 'Internal Server Error',
  );

  return res.status(error.status || 500).json({
    success: false,
    message: error.message,
  });
};

module.exports = errorHandler;
