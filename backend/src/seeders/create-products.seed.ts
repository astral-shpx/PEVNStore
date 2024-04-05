import type { DataSource } from 'typeorm';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Product } from '../entities/Product';
import { ProductFactory } from '../factories/product.factory';

export default class UserSeeder extends Seeder {
  async run(dataSource: DataSource) {
    const products: Product[] = [];
    new ProductFactory().makeMany(13);
    await dataSource.createEntityManager().save<Product>(products);
  }
}
