import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly connection: Connection,
  ) {}
  async create(product: CreateProductDto) {
    const {
      name_product,
      description,
      price,
      stock,
      img_product,
      category_id,
    } = product;

    const newProduct = this.productRepository.create({
      name_product: name_product,
      description: description,
      price: price,
      img_product: img_product,
      stock: stock,
      category: { category_id: category_id },
    });
    await this.productRepository.save(newProduct);
    return this.findAll();
  }

  async findAll() {
    const result = await this.productRepository.find({
      relations: ['category'],
      order: { price: 'ASC' },
      where:{category:{category_id:9}}
    });
    return result;
  }

  async findOne(id: number) {
    const result = await this.productRepository.findOne({
      where: { product_id: id },
      relations: ['category'],
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const {
      name_product,
      price,
      description,
      stock,
      category_id,
      img_product,
    } = updateProductDto;
    try {
      return this.connection.transaction(async (entityManager) => {
        await entityManager
          .createQueryBuilder()
          .update(Product)
          .set({
            name_product: name_product,
            price: price,
            description: description,
            stock: stock,
            category: category_id,
            img_product: img_product,
          })
          .where('product_id = :product_id', { product_id: id })
          .execute();
        return this.findAll();
      });
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Error updating product:', error);
    }
  }

  async remove(id: number) {
    await this.productRepository.delete(id);
    return this.findAll();
  }
}
