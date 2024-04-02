import { ProductDetail } from 'src/product-detail/entities/product-detail.entity';
import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column({ type: 'varchar', length: 255 })
  name_category: string;

  @OneToMany(() => Product, (product) => product.category)
  product: Product[]
  
  
}
