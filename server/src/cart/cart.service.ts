import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
  ) {}

  async create(product_id: any, user_id: any) {
    const check = await this.cartRepository.findOne({
      where: {
        user: { user_id: user_id },
        product: { product_id: product_id },
      },
    });

    if (!check) {
      const newCart = this.cartRepository.create({
        user: { user_id: user_id },
        quantity: 1,
        product: { product_id: product_id },
      });
      const result = await this.cartRepository.save(newCart);
      return result;
    } else {
      const cartId = check.cart_id;
      await this.cartRepository
        .createQueryBuilder()
        .update(Cart)
        .set({ quantity: () => 'quantity + 1' })
        .where('cart_id = :id', { id: cartId })
        .execute();

      return {
        statusCode: 200,
        message: 'Product + 1',
      };
    }
    // if(!check){
    //   const result = await this.cartRepository.create({
    //     user: user_id,
    //     quantity: 1,
    //     product: product_id,
    //   });
    //   const result2 = await this.cartRepository.save(result);
    //   return result2;

    // }else{
    //   const result = await this.cartRepository
    //     .createQueryBuilder()
    //     .update(Cart)
    //     .set({ quantity: () => 'quantity + 1' })
    //     .where('cart_id = :id', { id: check.cart_id })
    //     .execute();
    //   return {
    //     statusCode: 200,
    //     message: 'Product + 1',
    //     data: result,
    //   }
    // }
  }

  // async findOne(userId: any, productId: any) {
  //   const result = await this.cartRepository
  //     .createQueryBuilder('cart')
  //     .select()
  //     .where('user_id = :user', { user: userId })
  //     .andWhere('product_id = :product', { product: productId })
  //     .innerJoinAndSelect('cart.product', 'product')
  //     .getOne();
  //   return result;
  // }

  async findAll(user_id: any) {
    const cart = await this.cartRepository
      .createQueryBuilder('cart')
      .select()
      .where('user_id = :user', { user: user_id })
      .innerJoinAndSelect('cart.product', 'product')
      .getMany();
    // console.log("22222",carts);
    return cart;
  }

  async updateIncrease(increase: any) {
    const result = await this.cartRepository.findOneOrFail({
      where: { cart_id: increase.cart_id },
    });
    result.quantity += 1;
    return this.cartRepository.save(result);
  }

  async updateDecrease(decrease: any) {
    const result = await this.cartRepository.findOneOrFail({
      where: { cart_id: decrease.cart_id },
    });
    result.quantity -= 1;
    return this.cartRepository.save(result);
  }

  async remove(id: number) {
    await this.cartRepository
      .createQueryBuilder()
      .delete()
      .from(Cart)
      .where('cart_id = :id', { id })
      .execute();
    return this.cartRepository.find();
  }

  async removeCart(user_id: any) {
    await this.cartRepository
      .createQueryBuilder()
      .delete()
      .from(Cart)
      .where('user_id = :id', { id: user_id })
      .execute();
    return this.cartRepository.find();
  }
}
