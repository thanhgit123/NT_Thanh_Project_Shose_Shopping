import { Module } from '@nestjs/common';
import { OrderDetailService } from './order_detail.service';
import { OrderDetailController } from './order_detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order_detail.entity';

@Module({
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
  imports: [TypeOrmModule.forFeature([OrderDetail])],
})
export class OrderDetailModule {}
