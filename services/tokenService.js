const jwt = require('jsonwebtoken');

module.exports = {
  sign: (credentials, personalKey) => {
    return jwt.sign(credentials, personalKey, { expiresIn: '1h' });
  },

  verify: (token, personalKey) => {
    return jwt.verify(token, personalKey);
  },
}
