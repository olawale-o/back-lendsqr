const db = require('../connection');
const { UserModel } = require('../models');

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
    return new UserModel(user);
  },

  myTransactions: async (account_no, limit = 3) => {
    const transactions = await db('transaction')
    .join('user', 'user.account_no', '=', 'transaction.receiver')
    .where({ sender: account_no })
    .select('user.first_name', 'user.last_name', 'transaction.id', 'transaction.amount', 'transaction.created_at')
    .orderBy('transaction.created_at', 'desc')
    .limit(limit);
    return transactions;
  },

  findBy: async function (credentials) {
    const user = await db('user').where(credentials).first('id', 'email', 'first_name', 'last_name', 'balance', 'password', 'account_no');
    const transactions = await this.myTransactions(user.account_no);
    user.transactions = transactions;
    return new UserModel(user);
  },

  updateBalance: async (filter, credentials) => {
    const user = await db('user').where(filter).first('id', 'balance');
    if (!user) {
      throw new Error('User not found');
    }
    const newBalance = parseFloat(user.balance) + parseFloat(credentials.balance);

    const rows = await db.transaction(async (trx) => await db('user').where('id', '=', user.id).update({ balance: newBalance }).transacting(trx));

    if (rows > 0) {
      const details = await db('user').where(filter).first('id', 'first_name', 'last_name', 'balance', 'account_no');
      return details;
    }

    throw new Error('User not found');
  },
};

