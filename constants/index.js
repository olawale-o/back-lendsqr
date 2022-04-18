require('dotenv').config();
const { PORT, ACCESS_SECRET, REFRESH_SECRER, NODE_ENV } = process.env;

module.exports = {
  env: {
    PORT,
    ACCESS_SECRET,
    REFRESH_SECRER,
    NODE_ENV,
  },
};
