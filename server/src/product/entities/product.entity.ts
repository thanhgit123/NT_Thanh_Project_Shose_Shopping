import { Cart } from 'src/cart/entities/cart.entity';
import { Category } from 'src/category/entities/category.entity';
import { OrderDetail } from 'src/order_detail/entities/order_detail.entity';
import { ProductDetail } from 'src/product-detail/entities/product-detail.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column({ type: 'varchar', length: 255 })
  name_product: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 3 })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({type:'longtext'})
  img_product: string;

  @ManyToOne(()=> Category, category => category.product)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => ProductDetail, (productDetail) => productDetail.product, {
    cascade: true,
  })
  productDetail: ProductDetail[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product, {
    cascade: true,
  })
  orderDetail: OrderDetail[];

  @OneToMany(() => Cart, (cart) => cart.product, {
    cascade: true,
  })
  cart: Cart[];
}
