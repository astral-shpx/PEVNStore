import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  Column
} from 'typeorm';
import { User } from './User';
import { Product } from './Product';

@Entity()
export class CartProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.favourites)
  user: User;

  @OneToOne(() => Product)
  @JoinColumn()
  product: Product;

  @Column('int')
  quantity: number;
}
