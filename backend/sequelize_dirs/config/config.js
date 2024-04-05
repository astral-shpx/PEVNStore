// require('dotnev').config();

const db = process.env.POSTGRES_DB || null;
const dbuser = process.env.POSTGRES_USER || null;
const dbpass = process.env.POSTGRES_PASSWORD || null;

module.exports = {
  development: {
    username: dbuser,
    password: dbpass,
    database: db,
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
};
