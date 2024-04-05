import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import 'reflect-metadata';
import { AppDataSource } from './data-source';
import { Product } from './entities/Product';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', async (req: Request, res: Response) => {
  const product = new Product();
  product.product_name = 'Me and Bears';
  product.product_description = 'I am near polar bears';

  const productRepository = AppDataSource.getRepository(Product);

  await productRepository.save(product);
  console.log('Product has been saved');

  const savedProducts = await productRepository.find();
  console.log('All Products from the db: ', savedProducts);

  res.send(
    `Express + TypeScript Server. Data from sequelize: ${JSON.stringify(
      savedProducts,
      null,
      2
    )}`
  );
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
