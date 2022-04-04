const db = require('../database');

module.exports = {
  transfer: async (credentials) => {
    try {
      const { sender, receiver, amount, description } = credentials;
      const { balance } = await db('user').where({ account_no: sender }).first('balance');
      if (balance < amount) {
        throw new Error('Insufficient balance');
      }
      const newSenderBalance = balance - amount;
      const transId = await db.transaction(async (trx) => {
        const recipient = await db('user').where({ account_no: receiver }).first();
        await trx('user').where({ account_no: sender }).update({ balance: newSenderBalance }).transacting(trx);
        await trx('user').where({ account_no: receiver }).update({ balance: parseFloat(recipient.balance )+ parseFloat(amount) }).transacting(trx);
        const ids = await trx('transaction').insert({ sender, receiver, amount, description }).transacting(trx);
        return ids[0];
      });
      return await db('transaction').where({ id: transId }).first('id', 'sender', 'receiver', 'amount', 'description');
    } catch (err) {
      throw new Error('Error while transferring');
    }
  },
};
