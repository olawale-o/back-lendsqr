const bcrypt = require('bcryptjs');
const UserModel = require('../models/user');

module.exports = {
  create: async (credentials) => {
    return await UserModel.createUser(credentials);
  },

  findBy: async (credentials) => {
    return await UserModel.findBy(credentials);
  },
};
