import { Cart } from 'src/cart/entities/cart.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { CommentModule } from './comment/comment.module';
import { ProductModule } from './product/product.module';
import { ProductDetailModule } from './product-detail/product-detail.module';
import { Product } from './product/entities/product.entity';
import { OrderModule } from './order/order.module';
import { OrderDetailModule } from './order_detail/order_detail.module';
import { ProductDetail } from './product-detail/entities/product-detail.entity';
import { Order } from './order/entities/order.entity';
import { OrderDetail } from './order_detail/entities/order_detail.entity';
import { Comment } from './comment/entities/comment.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'project_md5',
      entities: [
        User,
        Product,
        ProductDetail,
        Order,
        OrderDetail,
        Comment,
        Category,
        Cart,
      ],
      synchronize: true,
    }),
    UserModule,
    CommentModule,
    ProductModule,
    ProductDetailModule,
    OrderModule,
    OrderDetailModule,
    CategoryModule,
    AuthModule,
    CartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
