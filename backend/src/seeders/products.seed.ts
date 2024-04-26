import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Product } from '../entities/Product';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const productFactory = await factoryManager.get(Product);
    // save 1 factory generated entity, to the database
    await productFactory.save();

    // save 5 factory generated entities, to the database
    await productFactory.saveMany(5);
  }
}
