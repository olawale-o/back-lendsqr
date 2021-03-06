const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const errorHandler = require('../middleware/errorHandler');

const app = express();

require('../auth/passport');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/api/v1/users', require('../routes/users'));
app.use('/api/v1/transactions', passport.authenticate('jwt', {session: false}), require('../routes/transactions'));

app.use(errorHandler);

module.exports = app;
