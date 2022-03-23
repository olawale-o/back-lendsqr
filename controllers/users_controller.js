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
};