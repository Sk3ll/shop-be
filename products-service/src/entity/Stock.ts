import { Entity, Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Product from './Product';

@Entity('stocks')
class Stock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Product, product => product.id)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  count: number;
}

export default Stock;
