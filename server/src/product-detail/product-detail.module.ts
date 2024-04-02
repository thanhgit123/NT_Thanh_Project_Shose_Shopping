import { Module } from '@nestjs/common';
import { ProductDetailService } from './product-detail.service';
import { ProductDetailController } from './product-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDetail } from './entities/product-detail.entity';

@Module({
  controllers: [ProductDetailController],
  providers: [ProductDetailService],
  imports: [TypeOrmModule.forFeature([ProductDetail])],
})
export class ProductDetailModule {}
