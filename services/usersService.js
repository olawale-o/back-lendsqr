const UserModel = require('../models/user');

module.exports = {
  create: async (credentials) => {
    return await UserModel.createUser(credentials);
  },

  findBy: async (credentials) => {
    return await UserModel.findBy(credentials);
  },

  updateBalance: async (filter, credentials) => {
    return await UserModel.updateBalance(filter, credentials);
  },
};
