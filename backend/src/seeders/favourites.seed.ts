import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Product } from '../entities/Product';
import { User } from '../entities/User';
import { Favourite } from '../entities/Favourite';

export default class FavouritesSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const favouriteRepository = dataSource.getRepository(Favourite);
    const userRepository = dataSource.getRepository(User);
    const productRepository = dataSource.getRepository(Product);

    const user = await userRepository.findOne({ where: { username: 'admin' } });
    const product = await productRepository.findOne({ where: { id: 1 } });

    console.log('asdasd');

    if (user && product) {
      const newFavourite = favouriteRepository.create({
        user: user,
        product: product
      });

      await favouriteRepository.save(newFavourite);
      console.log('Favourite has been seeded:', newFavourite);
    } else {
      console.log('User or Product not found, seeding failed.');
    }
  }
}
