import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('/api/v1/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add/:id')
  async create(@Param('id') id: string, @Body() body: any) {
    const result = await this.cartService.create(body.product_id, id);
    return {
      statusCode: 200,
      message: 'Add cart successfully',
      data: result,
    };
  }

  @Get('byUser/:id')
  async GetCartByUser(@Param('id') id: string) {
    const result = await this.cartService.findAll(+id);
    return {
      statusCode: 200,
      message: 'Get cart successfully',
      data: result,
    };
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.cartService.findOne(+id);
  // }

  @Patch('increase')
  update(@Body() updateCartDto: any) {
    return this.cartService.updateIncrease(updateCartDto);
  }

  @Patch('decrease')
  updateDecrease(@Body() body: any) {
    return this.cartService.updateDecrease(body);
  }

  @Delete('deleteByitem/:id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }

  @Delete('deleteCartWhenPay/:id')
  removeAll(@Param('id') id: string) {
    return this.cartService.removeCart(+id);
  }
}
