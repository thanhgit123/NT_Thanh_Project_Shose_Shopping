import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCartDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  // @IsNumber()
  // quantity: number;

  @IsNumber()
  @IsNotEmpty()
  product_id: number;
}
