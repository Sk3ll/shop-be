import { Entity, Column, JoinColumn, OneToOne } from 'typeorm';
import Product from './Product';

@Entity()
class Stock {
  @OneToOne(() => Product)
  @JoinColumn()
  product_id: string;

  @Column()
  count: number;
}

export default Stock;
