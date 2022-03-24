const TransactionModel = require('../models/transaction');

module.exports = {
  transfer: async (credentials) => {
    try {
      return TransactionModel.transfer(credentials);
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  },
};
