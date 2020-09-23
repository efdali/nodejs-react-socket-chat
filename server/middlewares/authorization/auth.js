const jwt = require('jsonwebtoken');
const CustomError = require('../../helpers/error/CustomError');
const {
  isTokenIncluded,
  getTokenFromHeader,
} = require('../../helpers/authorization/tokenHelper');

const getAccessToPrivateRoute = (req, res, next) => {
  const { JWT_SECRET_KEY } = process.env;
  if (!isTokenIncluded(req)) {
    return next(new CustomError(401, 'Erişim yetkiniz yok.'));
  }

  const token = getTokenFromHeader(req);
  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) return next(new CustomError(401, err));

    req.user = {
      id: decoded.id,
      nick: decoded.nick,
    };

    next();
  });
};

module.exports = { getAccessToPrivateRoute };
