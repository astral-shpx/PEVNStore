import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import 'reflect-metadata';
import { AppDataSource } from './data-source';
import { Product } from './entities/Product';

dotenv.config();

// @jorgebodega/typeorm-seeding
// SyntaxError: Cannot use import statement outside a module
// https://github.com/jorgebodega/typeorm-seeding/issues/324

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', async (req: Request, res: Response) => {
  const product = new Product();
  product.product_name = 'Me and Bears';
  product.product_description = 'I am near polar bears';

  const productRepository = AppDataSource.getRepository(Product);

  // await productRepository.save(product);
  // console.log('Product has been saved');

  const savedProducts = await productRepository.find();
  console.log('All Products from the db: ', savedProducts);

  res.send(
    `Express + TypeScript Server. Data from typeorm: ${JSON.stringify(
      savedProducts,
      null,
      2
    )}`
  );
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
