const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const usersService = require('../services/usersService');

module.exports = {
  createUser: async (req, res) => {
    try {
      const credentials = { ...req.body, password: bcrypt.hashSync(req.body.password, 10), accountNo: uuidv4() };
      const user = await usersService.createUser(credentials);
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