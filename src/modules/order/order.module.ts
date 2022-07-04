import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartLineEntity } from '../cart/cart-line.entity';
import { ProductVariantEntity } from '../product-variant/product-variant.entity';
import { ProductRepositoryProvider } from '../product/product.repository';
import { OrderLineEntity } from './order-line.entity';
import { OrderController } from './order.controller';
import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    TypeOrmModule.forFeature([OrderLineEntity]),
    TypeOrmModule.forFeature([ProductVariantEntity]),
    TypeOrmModule.forFeature([CartLineEntity]),
  ],
  controllers: [OrderController],
  providers: [OrderService, ProductRepositoryProvider],
})
export class OrderModule {}
