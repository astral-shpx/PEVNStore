import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import sequelize from './db_connection';
import Product, { ProductAttributes } from './models/Product';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', async (req: Request, res: Response) => {
  await sequelize.sync({ force: true });
  const productData: ProductAttributes = { product_name: 'the product name' };
  const product = await Product.create(productData);
  await product.save();
  res.send(
    `Express + TypeScript Server. Data from sequelize: ${product.product_name}`
  );
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
