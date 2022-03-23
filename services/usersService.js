const UserModel = require('../models/user');

module.exports = {
  createUser: async (credentials) => {
    return UserModel.createUser(credentials);
  },
};
