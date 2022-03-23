const bcrypt = require('bcryptjs');
const db = require('../database');

module.exports = {
  createUser: async (credentials) => {
    const { email: userEmail, password, firstName, lastName } = credentials;
    const user = await db('user').insert({
        email: userEmail,
        password: await bcrypt.hashSync(password, 10),
        first_name: firstName,
        last_name: lastName,
    }).then(id => db('user').where({ id }).first('id', 'email', 'first_name', 'last_name', 'balance'));

    return user;
  },

  findUserBy: async (credentials) => {
    const user = await db('user').where(credentials).first('id', 'email', 'first_name', 'last_name', 'balance', 'password');
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  },
};
