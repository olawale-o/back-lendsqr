const { transactionRepository} = require('../database');

module.exports = {
  transfer: async (credentials) => {
    try {
      return transactionRepository.transfer(credentials);
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  },
};
