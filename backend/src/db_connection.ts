import { Sequelize } from 'sequelize';
require('dotenv').config();

const db = process.env.POSTGRES_DB;
const dbuser = process.env.POSTGRES_USER;
const dbpass = process.env.POSTGRES_PASSWORD;

let sequelize!: Sequelize;

sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'postgres',
  username: dbuser,
  password: dbpass,
  database: db
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

export default sequelize;
