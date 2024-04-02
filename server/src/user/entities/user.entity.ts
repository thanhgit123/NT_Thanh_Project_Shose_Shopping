import { Cart } from 'src/cart/entities/cart.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Order } from 'src/order/entities/order.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

enum Role {
  USER,
  ADMIN,
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'varchar', length: 100 })
  user_name: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'int', default: Role.USER })
  role: Role;

  @Column({ type: 'tinyint', default: false })
  status:number

  @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
  comment: Comment[];

  @OneToMany(() => Order, (order) => order.user, { cascade: true })
  order: Order[];

  @OneToMany(()=>Cart,(cart)=> cart.user , {cascade:true})
  cart:Cart[]
}
