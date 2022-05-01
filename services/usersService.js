const { userRepository } = require('../database');

module.exports = {
  create: async (credentials) => {
    return await userRepository.createUser(credentials);
  },

  findBy: async (credentials) => {
    return await userRepository.findBy(credentials);
  },

  updateBalance: async (filter, credentials) => {
    return await userRepository.updateBalance(filter, credentials);
  },

  myTransactions: async (account_no) => {
    return await userRepository.myTransactions(account_no);
  }
};
