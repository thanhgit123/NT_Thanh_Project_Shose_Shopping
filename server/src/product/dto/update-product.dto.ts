import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsString()
    @IsNotEmpty()
    name_product: string;
  
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @IsString()
    @IsNotEmpty()
    price: number;
  
    @IsString()
    @IsNotEmpty()
    stock: number;
  
    @IsNotEmpty()
    @IsString()
    img_product: string;
  
    @IsString()
    @IsNotEmpty()
    category_id: number;
}
