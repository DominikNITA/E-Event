require('dotenv').config()

const knex = require('knex');

const client = knex({
    client: 'pg',
    version: '7.2',
    connection : process.env.DB_CONNECTION
  });

module.exports = client