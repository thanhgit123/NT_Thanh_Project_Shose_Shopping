import { UpdateResult } from 'typeorm';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('/api/v1/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  async create(@Body() body: any) {
    const result = await this.orderService.create(body);
    return {
      statusCode: 200,
      message: 'Create order successfully',
      data: result,
    };
  }

  @Get('getBillAdmin')
  async getBillAdmin(){
    const result = await this.orderService.getBillAdmin();
    return{
      statusCode: 200,
      message: 'Get bill admin successfully',
      data: result
    }
  }  

  @Get('list/:id')
  async findAll(@Param('id') id: string) {
    const result = await this.orderService.findAll(+id);
    return {
      statusCode: 200,
      message: 'Get all order successfully',
      data: result,
    };
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.orderService.findOne(+id);
  // }

  @Patch('statusPurchase/:id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.orderService.updateCancelUser(+id, body);
  }


  @Patch('updateAccept/:id')
   async updateAccept(@Param('id') id: string, @Body() body: any) {
      const result = await this.orderService.updateAccept(+id,body);
  }

  @Patch('updateRefuse/:id')
  async updateRefuse(@Param('id') id: string, @Body() body: any) {
    const result = await this.orderService.updateRefuse(+id, body);
  }


}
