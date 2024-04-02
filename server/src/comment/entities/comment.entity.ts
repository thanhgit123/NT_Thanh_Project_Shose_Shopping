import { ProductDetail } from 'src/product-detail/entities/product-detail.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @Column({ type: 'varchar', length: 255 })
  content: string;

  @Column({type: 'int'})
  rating: number;

  @ManyToOne(() => User, (user) => user.comment )
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => ProductDetail, (product_detail) => product_detail.comment,{cascade: true})
  product_detail: ProductDetail[];
}
