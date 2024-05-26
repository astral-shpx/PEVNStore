import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Product } from './Product';

@Entity()
export class Favourite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.favourites)
  user: User;

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;
}
