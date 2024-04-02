import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order_detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
  ) {}

  async create(body: any) {
    const { product_id, order_id, quantity } = body;
    const result = await this.orderDetailRepository.create({
      product: product_id,
      order_id: order_id,
      quantity,
    });
    return await this.orderDetailRepository.save(result);
  }

  async findAll(order_id) {
    const result = await this.orderDetailRepository
      .createQueryBuilder('order_detail')
      .innerJoinAndSelect('order_detail.product', 'product')
      .innerJoinAndSelect('product.category', 'category')
      .where('order_detail.order_id = :id', { id: order_id })
      .getMany();
    return result;
  }
}
