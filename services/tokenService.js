const jwt = require('jsonwebtoken');
const { env: { JWT_SECRET } } = require('../constants');

module.exports = {
  sign: (credentials) => {
    return jwt.sign(credentials, JWT_SECRET, { expiresIn: '60000' });
  },
}