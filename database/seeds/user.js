const bcrypt = require('bcryptjs');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert([
    {id: 1, first_name: 'test1', last_name: 'test1', email: 'test1@test.com', password: bcrypt.hashSync('password', 10), account_no: 'test1'},
    {id: 2, first_name: 'test2', last_name: 'test2', email: 'test2@test.com', password: bcrypt.hashSync('password', 10), account_no: 'test2'},
  ]);
};
