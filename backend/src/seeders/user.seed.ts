import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import argon2 from 'argon2';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const userRepository = dataSource.getRepository(User);

    const hashedPassword = await argon2.hash('adminadmin', {
      timeCost: 3,
      memoryCost: 1024 * 64
    });

    const newUser = userRepository.create({
      username: 'admin',
      password_hash: hashedPassword
    });

    await userRepository.save(newUser);
  }
}
