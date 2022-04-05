const db = require('../database');

module.exports = {
  createUser: async (credentials) => {
    const { email, password, firstName, lastName, accountNo } = credentials;
    const user = await db('user').insert({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        account_no: accountNo,
    }).then(id => db('user').where({ id }).first('id', 'email', 'first_name', 'last_name', 'balance', 'account_no'));
    return user;
  },

  findBy: async (credentials) => {
    const user = await db('user').where(credentials).first('id', 'email', 'first_name', 'last_name', 'balance', 'password', 'account_no');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },

  myTransactions: async (account_no, limit = 3) => {
    const transactions = await db('transaction')
    .join('user', 'user.account_no', '=', 'transaction.receiver')
    .where({ sender: account_no })
    .select('user.first_name', 'user.last_name', 'transaction.amount', 'transaction.created_at')
    .orderBy('transaction.created_at', 'desc')
    .limit(limit);
    return transactions;
  },

  updateBalance: async (filter, credentials) => {
    const user = await db('user').where(filter).first('id', 'balance');
    if (!user) {
      throw new Error('User not found');
    }
    const newBalance = parseFloat(user.balance) + parseFloat(credentials.balance);
    const trans = await db.transaction(function(trx) {
      return db('user').where('id', '=', user.id).update({ balance: newBalance });
    }).then(function(row) {
      const trans = db('user').where({ id: row }).first('id', 'first_name', 'last_name', 'balance', 'account_no');
      return trans;
    }).catch(function(err) {
       console.log(err);
       return err;
    });
    return trans;
  },
};
