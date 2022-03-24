const db = require('../database');

module.exports = {
  transfer: async (credentials) => {
    const { sender, receiver, amount, description } = credentials;
    const { balance } = await db('user').where({ account_no: sender }).first('balance');
    if (balance < amount) {
        throw new Error('Insufficient balance');
    }
    const senderBalance = balance - amount;

    const trans = await db.transaction(function(trx) {
      return db('user')
      .where('account_no', '=', sender)
      .update({ balance: senderBalance })
      .then(function(ids) {
        return trx('transaction').insert({
          sender,
          receiver,
          amount,
          description,
        })
      }).catch(function(err) {
        console.log(err);
        return err;
      })
    }).then(function(row) {
      const trans = db('transaction').where({ id: row }).first('id', 'sender', 'receiver', 'amount', 'description');
      return trans;
    }).catch(function(err) {
       console.log(err);
       return err;
    });
    return trans;
  },
};
