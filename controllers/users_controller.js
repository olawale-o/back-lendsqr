const passport = require('passport');
const { env: { ACCESS_SECRET } } = require('../constants');
const tokenService = require('../services/tokenService');
const UserService = require('../services/usersService');

module.exports = {
  createUser: async (req, res, next) => {
    passport.authenticate('local-register', { session: false }, async (err, user, info) => {
      try {
        if (err || !user) {
          const error = new Error(info);
          if(err) {
            return res.status(500).json(info)
          }
          if(!user) {
            return res.status(403).json(info);
          }
          return next(error);
        } else {
            const body = {
              id: user.id,
              email: user.email,
              fullname: user.first_name,
              created_at: user.created_at,
              updated_at: user.updated_at
            };
            const token = tokenService.sign(body, ACCESS_SECRET);
            return res.status(201).json({
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
          if (err) { 
            return next(error);
          }
          if (!user) {
            return res.status(401).json(info);
          }
        }
        req.login(user, {session: false}, async (err) => {
          if (err) return next(err);
          const body = {
            id: user.id,
            email: user.email,
            fullname: user.first_name,
            created_at: user.created_at,
            updated_at: user.updated_at
          };
          const token = tokenService.sign(body, ACCESS_SECRET);
          const transactions = await UserService.myTransactions(user.account_no);
          return res.status(200).json({
            user: {
              id: user.id,
              email: user.email,
              account_no: user.account_no,
              first_name: user.first_name,
              last_name: user.last_name,
              created_at: user.created_at,
              updated_at: user.updated_at,
              balance: user.balance,
              transactions,
            },
            token,
            message: 'User loggedin successfully',
          });
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  },

  deposit: async (req, res, next) => {
    try {
      const { amount } = req.body;
      const { id } = req.params;
      const user = await UserService.updateBalance({ id }, { balance: amount });
      res.status(200).json({ message: 'Deposit successful', user, });
    } catch (error) {
      return next(error);
    }
  },
};