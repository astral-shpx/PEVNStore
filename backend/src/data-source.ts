import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Product } from './entities/Product';
require('dotenv').config();

const db = process.env.POSTGRES_DB;
const dbuser = process.env.POSTGRES_USER;
const dbpass = process.env.POSTGRES_PASSWORD;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: dbuser,
  password: dbpass,
  database: db,
  synchronize: true,
  logging: true,
  entities: [Product],
  subscribers: [],
  migrations: []
});

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
  })
  .catch(error => console.log(error));
