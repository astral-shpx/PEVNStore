import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import sequelize from './db_connection';
import Product from './models/Product';

dotenv.config();

// let sequelize = initSequelize();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', async (req: Request, res: Response) => {
  await sequelize.sync({ force: true });
  const product = await Product.create({ product_name: 'product name' });
  await product.save();
  res.send(
    `Express + TypeScript Server. Data from sequelize: ${product.product_name}`
  );
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
