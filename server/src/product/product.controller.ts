import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('/api/v1/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async create(@Body() body: CreateProductDto) {
    const result = await this.productService.create(body);
    return {
      statusCode: 201,
      message: 'Create product successfully',
      data: result,
    };
  }

  @Get('list')
  async findAll() {
    const result = await this.productService.findAll();
    return {
      statusCode: 200,
      message: 'Get all product successfully',
      data: result,
    };
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() body: UpdateProductDto) {
    const result = await this.productService.update(+id, body);
    return {
      statusCode: 200,
      message: 'Update product successfully',
      data: result,
    };
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    const result = await this.productService.remove(+id);
    return {
      statusCode: 200,
      message: 'Delete product successfully',
      data: result,
    };
  }
}
