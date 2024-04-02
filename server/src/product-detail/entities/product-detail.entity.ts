import { Category } from 'src/category/entities/category.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product_detail')
export class ProductDetail {
  @PrimaryGeneratedColumn()
  product_detail_id: number;

  @Column({ type: 'int' })
  img_product_id: number;

  @ManyToOne(() => Product, (product) => product.productDetail)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Comment, (comment) => comment.product_detail)
  @JoinColumn({ name: 'comment_id' })
  comment: Comment;
}
