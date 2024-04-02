import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
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
