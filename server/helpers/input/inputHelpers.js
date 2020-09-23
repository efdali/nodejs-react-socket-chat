const bcrypt = require('bcryptjs');

const validateInput = (nick, password) => {
  return !!nick && !!password;
};

const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

module.exports = { validateInput, comparePassword };
