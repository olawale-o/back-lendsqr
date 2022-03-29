const passport = require('passport');
const jwt = require('jsonwebtoken');
const { env: { JWT_SECRET } } = require('../constants');

module.exports = {
  createUser: async (req, res, next) => {
    passport.authenticate('local-register', { session: false }, async (err, user, info) => {
      try {
        if (err || !user) {
          const error = new Error(info);
          if(err) {
            res.status(500).json(info)
          }
          if(!user) {
            res.status(403).json(info);
          }
          return next(error);
        } else {
            const body = {
              id: user.id,
              email: user.email,
              fullname: user.first_name,
              phoneNo: user.last_name,
              created_at: user.created_at,
              updated_at: user.updated_at
            };
            const token = jwt.sign({user: user,},JWT_SECRET);
            res.status(201).json({
              user: body,
              token: token,
              message: "registered successfully",
            });
        }
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
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