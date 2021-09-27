import { Entity, Column, JoinColumn, OneToOne, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import Product from './Product';

@Entity('stocks')
class Stock extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Product, product => product.id)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  count: number;
}

export default Stock;
