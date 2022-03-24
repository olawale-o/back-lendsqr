const transactionService = require('../services/transactionsService');

module.exports = {
  transfer: async (req, res) => {
    try {
      const transaction = await transactionService.transfer(req.body);
      res.status(201).json({ transaction });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },
};