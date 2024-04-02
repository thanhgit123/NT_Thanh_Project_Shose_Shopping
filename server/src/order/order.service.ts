import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}
  async create(body: any) {
    const { user_id, purchase, address_bill, phone_bill, status } = body;
    const result = await this.orderRepository.create({
      user: user_id,
      purchase,
      address_bill,
      phone_bill,
      status,
    });
    return await this.orderRepository.save(result);
  }

  findAll(user_id: number) {
    const result = this.orderRepository
      .createQueryBuilder('order')
      .select()
      .where('user_id = :user', { user: user_id })
      .take(1)
      .getMany();
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async updateCancelUser(id: number, body: any) {
    const result = await this.orderRepository
      .createQueryBuilder()
      .update(Order)
      .set({ status: body.status })
      .where('order_id = :id', { id })
      .execute();

    return result;
  }

  async getBillAdmin() {
    const result = await this.orderRepository
      .createQueryBuilder('order')
      .innerJoinAndSelect('order.user', 'user')
      .getMany();
    return result;
  }

  async updateAccept(order_id: number, body: any) {
    const result = await this.orderRepository
      .createQueryBuilder()
      .update(Order)
      .set({ status: body.status })
      .where('order_id = :id', { id: order_id })
      .execute();
    return result;
  }

  async updateRefuse(order_id: number, body: any) {
    const result = await this.orderRepository
      .createQueryBuilder()
      .update(Order)
      .set({ status: body.status })
      .where('order_id = :id', { id: order_id })
      .execute();
    return result;
  }
}
