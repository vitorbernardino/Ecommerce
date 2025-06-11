import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @ManyToMany(() => Order, (order) => order.products)
  orders: Order[];
}