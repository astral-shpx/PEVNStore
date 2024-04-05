// require('dotnev').config();

const db = process.env.POSTGRES_DB || null;
const dbuser = process.env.POSTGRES_USER || null;
const dbpass = process.env.POSTGRES_PASSWORD || null;
const dbhost = process.env.DB_HOST || null;

module.exports = {
  development: {
    username: dbuser,
    password: dbpass,
    database: db,
    host: dbhost,
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
