import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import sequelize from './db_connection';
import Product, { ProductAttributes } from './models/Product';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

sequelize
  .sync({ force: true }) // This will drop existing tables and recreate them
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

app.get('/', async (req: Request, res: Response) => {
  // await sequelize.sync({ force: true });
  // await sequelize.sync(); // removes seeded data
  // const productData: ProductAttributes = { product_name: 'the product name' };
  // const product = await Product.create(productData);
  // await product.save();
  const product = await Product.findAll();
  // console.log('All users:', JSON.stringify(product, null, 2));

  res.send(
    `Express + TypeScript Server. Data from sequelize: ${JSON.stringify(
      product,
      null,
      2
    )}`
  );
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
