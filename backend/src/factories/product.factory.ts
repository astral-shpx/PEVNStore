import { setSeederFactory } from 'typeorm-extension';
import { Product } from '../entities/Product';

export default setSeederFactory(Product, faker => {
  const product = new Product();

  product.product_name = faker.commerce.productName();
  product.product_description = faker.lorem.paragraph();
  product.product_category = faker.commerce.department();
  product.product_price = parseInt(faker.commerce.price(), 10);
  product.release_date = faker.date.past();
  product.manufacturer = faker.company.name();
  product.product_rating = faker.number.float({
    min: 1,
    max: 5,
    multipleOf: 0.1
  });
  product.customer_reviews = faker.number.int({
    min: 0,
    max: 1000
  });
  product.product_image_url = faker.image.urlPicsumPhotos();
  product.product_website = faker.internet.url();

  return product;
});
