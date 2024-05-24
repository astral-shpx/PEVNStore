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

    if (user) {
      const totalProducts = await productRepository.count();

      if (totalProducts > 0) {
        const randomIndex = Math.floor(Math.random() * totalProducts);

        const randomProduct = await productRepository.find({
          skip: randomIndex,
          take: 1
        });

        if (randomProduct.length > 0) {
          const newFavourite = favouriteRepository.create({
            user: user,
            product: randomProduct[0]
          });

          await favouriteRepository.save(newFavourite);
          console.log(
            'Favourite has been seeded with a random product:',
            newFavourite
          );
        } else {
          console.log('No products found to create a favourite.');
        }
      } else {
        console.log('No products available in the database.');
      }
    } else {
      console.log('User not found, seeding failed.');
    }
  }
}
