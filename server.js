const  env = require('./constants');
const { PORT } = env;

const http = require('http');

const app = require('./config/app');
const server = http.createServer(app);

server.listen(PORT || 5000, () => {
  console.log('Server started on port 5000');
});

module.exports = server;