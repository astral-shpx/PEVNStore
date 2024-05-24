import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Favourite } from './Favourite';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  username!: string;

  @Column({ nullable: true })
  password_hash!: string;

  @Column({ unique: true, nullable: true })
  googleId?: string; // Google ID for users logging in via Google

  @Column({ unique: true, nullable: true })
  email?: string; // Email can be used for both Google and local accounts

  @Column({ nullable: true })
  displayName?: string; // Optional: for storing the user's display name

  @OneToMany(() => Favourite, fav => fav.user)
  favourites: Favourite[];
}
