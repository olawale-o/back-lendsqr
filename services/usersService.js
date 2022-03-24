const bcrypt = require('bcryptjs');
const UserModel = require('../models/user');

module.exports = {
  createUser: async (credentials) => {
    return UserModel.createUser(credentials);
  },

  authenticateUser: async (credentials) => {
    try {
      const { email, password } = credentials;
      const user = await UserModel.findUserBy({ email });
      if (!user) {
        throw new Error('Please provide valid credentials');
      }
      const isPasswordValid = bcrypt.compareSync(password, user.password);
  
      if (!isPasswordValid) {
        throw new Error('Please provide valid credentials');
      }
  
      return {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        balance: user.balance,
        account_no: user.account_no,
      }
    } catch (error) {
      throw error;
    }
  },
};
