import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  product_name!: string;

  @Column('text')
  product_description!: string;

  @Column({ length: 11 })
  product_category!: string;

  @Column('decimal', { precision: 9, scale: 2 })
  product_price!: number;

  @Column('date')
  release_date!: Date;

  @Column({ length: 50 })
  manufacturer!: string;

  @Column('decimal', { precision: 2, scale: 1 })
  product_rating!: number;

  @Column('int')
  customer_reviews!: number;

  @Column({ length: 50 })
  product_image_url!: string;

  @Column({ length: 1000 })
  product_website!: string;
}
