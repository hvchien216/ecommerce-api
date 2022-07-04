import { Helpers } from '@/utils/helpers';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductVariantEntity } from '../product-variant/product-variant.entity';
import { ProductRepositoryProvider } from '../product/product.repository';
import { StoreEntity } from '../store/store.entity';
import { UserEntity } from '../user/user.entity';
import { CartLineEntity } from './cart-line.entity';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartLineEntity]),
    TypeOrmModule.forFeature([StoreEntity]),
    TypeOrmModule.forFeature([ProductVariantEntity]),
    TypeOrmModule.forFeature([UserEntity]),
  ],

  controllers: [CartController],
  providers: [CartService, ProductRepositoryProvider, Helpers],
})
export class CartModule {}
