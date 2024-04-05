require('dotnev').config();

interface DatabaseConfig {
  username: string;
  password: string | null;
  database: string;
  host: string;
  dialect: string;
}

interface Config {
  development: DatabaseConfig;
  test: DatabaseConfig;
  production: DatabaseConfig;
}

let dbpass: string | null = process.env.POSTGRES_PASSWORD || null;

const config: Config = {
  development: {
    username: 'postgres',
    password: dbpass,
    database: 'test',
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

export default config;
