import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderDetailService } from './order_detail.service';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';

@Controller('api/v1/order-detail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Post('create')
  create(@Body() body: any) {
    return this.orderDetailService.create(body);
  }

  @Get('list/:id')
  async findAll(@Param('id') id: string) {
    const result =   await this.orderDetailService.findAll(+id);
    return{
      statusCode: 200,
      message: 'Get all order detail successfully',
      data: result
    }
  }

 

 
}
