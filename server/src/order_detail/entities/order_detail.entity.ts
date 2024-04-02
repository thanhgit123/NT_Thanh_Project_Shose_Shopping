import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('order_detail')
export class OrderDetail {
  @PrimaryGeneratedColumn()
  order_detail_id: number;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Product, (product) => product.orderDetail)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(()=>Order,(order)=>order.orderDetail)
  @JoinColumn({name:'order_id'})
  order_id:Order
}
