import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column
} from 'typeorm';
import { User } from './User';
import { Product } from './Product';

@Entity()
export class CartProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.cartProducts)
  user: User;

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;

  @Column('int')
  quantity: number;
}
