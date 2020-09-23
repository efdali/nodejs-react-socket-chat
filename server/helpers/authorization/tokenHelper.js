const isTokenIncluded = (req) => {
  return (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  );
};

const getTokenFromHeader = (req) => {
  return req.headers.authorization.split('Bearer ')[1];
};

module.exports = {
  isTokenIncluded,
  getTokenFromHeader,
};
