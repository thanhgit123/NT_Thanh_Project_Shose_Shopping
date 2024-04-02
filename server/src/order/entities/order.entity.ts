import { OrderDetail } from 'src/order_detail/entities/order_detail.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

enum Status {
  CANCEL,
  PROCESSING,
  ACCEPTED,
}
@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  purchase: number;

  @Column({ type: 'varchar', length: 255 })
  address_bill: string;

  @Column({ type: 'int' })
  phone_bill: number;

  @ManyToOne(() => User, (user) => user.order)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order_id)
  orderDetail: OrderDetail[];
}
