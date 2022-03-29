const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { env: { JWT_SECRET } } = require('../constants');
const usersService = require('../services/usersService');

module.exports = {
  createUser: async (req, res) => {
    try {
      const credentials = { ...req.body, password: bcrypt.hashSync(req.body.password, 10), accountNo: uuidv4() };
      const user = await usersService.create(credentials);
      res.status(201).json({ user });
    } catch (error) {
      res.status(401).json({ error });
    }
  },

  authenticateUser: async (req, res, next) => {
    passport.authenticate('local-login', async (err, user, info) => {
      try {
        if (err || !user) {
          const error = new Error(info.message);
          res.status(401).json(info);
          return next(error);
        }
        req.login(user, {session: false}, async (err) => {
          if (err) return next(err);
          const token = jwt.sign({
            userId: user.id,
            firstname: user.first_name,
            lastname: user.last_name,
            email: user.email,
          }, JWT_SECRET, { expiresIn: '1h',});
          res.status(200).json({ user, token, message: 'User loggedin successfully',});
        });
      } catch (error) {
        return next(error);
        // res.status(401).json({ error: error.message });
      }
    })(req, res, next);
  },
};