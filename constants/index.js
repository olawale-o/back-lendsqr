
require('dotenv').config();
const { PORT, JWT_SECRET } = process.env;

module.exports = {
  env: {
    PORT,
    JWT_SECRET,
  },
};
