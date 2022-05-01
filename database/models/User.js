class User {
  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.password = data.password;
    this.first_ame = data.first_name;
    this.last_name = data.last_name;
    this.balance = data.balance;
    this.account_no = data.account_no;
    this.transactions = data.transactions || []; 
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }
}

module.exports = User;
