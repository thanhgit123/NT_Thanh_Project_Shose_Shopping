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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('api/v1/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  async create(@Body() body: CreateCategoryDto) {
    const result = await this.categoryService.create(body);
    return {
      statusCode: 200,
      message: 'Create category successfully',
      data: result,
    };
  }

  @Get('list')
  async findAll() {
    const result = await this.categoryService.findAll();
    return {
      statusCode: 200,
      message: 'Get all category successfully',
      data: result,
    };
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
    const result = await this.categoryService.update(+id, body);
    return {
      statusCode: 200,
      message: 'Update category successfully',
      data: result,
    };
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    const result = await this.categoryService.remove(+id);
    return {
      statusCode: 200,
      message: 'Delete category successfully',
      data: result,
    };
  }
}
