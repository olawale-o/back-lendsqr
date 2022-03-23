const usersService = require('../services/usersService');

module.exports = {
  createUser: async (req, res) => {
    try {
      const { user } = await usersService.createUser(req.body);
      res.status(201).json({ user });
    } catch (error) {
      console.log(error);
      res.status(401).json({ error });
    }
  },

  authenticateUser: async (req, res) => {
    try {
      const user = await usersService.authenticateUser(req.body);
      res.status(200).json({ user });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },
};