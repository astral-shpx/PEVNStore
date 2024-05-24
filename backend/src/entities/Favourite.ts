import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { User } from './User';
import { Product } from './Product';

@Entity()
export class Favourite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.favourites)
  user: User;

  @OneToOne(() => Product)
  @JoinColumn()
  product: Product;
}
