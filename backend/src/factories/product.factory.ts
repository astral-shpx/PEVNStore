import type { DataSource } from 'typeorm';
import { Factory, FactorizedAttrs } from '@jorgebodega/typeorm-factory';
import { Product } from '../entities/Product';
import { faker } from '@faker-js/faker';
import { AppDataSource } from '../data-source';

export class ProductFactory extends Factory<Product> {
  protected entity = Product;
  protected dataSource: DataSource = AppDataSource;
  protected attrs(): FactorizedAttrs<Product> {
    return {
      product_name: faker.commerce.productName(),
      product_description: faker.lorem.paragraph(),
      product_category: faker.commerce.department(),
      product_price: parseInt(faker.commerce.price(), 10),
      release_date: faker.date.past(),
      manufacturer: faker.company.name(),
      product_rating: faker.number.float({
        min: 1,
        max: 5,
        precision: 0.1
      }),
      customer_reviews: faker.number.int({
        min: 0,
        max: 1000
      }),
      product_image_url: faker.image.imageUrl(),
      product_website: faker.internet.url()
      //   createdAt: new Date(),
      //   updatedAt: new Date()
    };
  }
}
