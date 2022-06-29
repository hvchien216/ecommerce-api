import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../category/category.entity';
import { ProductVariantEntity } from '../product-variant/product-variant.entity';
import { ProductVariantModule } from '../product-variant/product-variant.module';
import { StoreEntity } from '../store/store.entity';
import { ProductController } from './product.controller';
import { ProductEntity } from './product.entity';
import { ProductRepositoryProvider } from './product.repository';
import { ProductService } from './product.service';

@Module({
  imports: [
    forwardRef(() => ProductVariantModule),
    TypeOrmModule.forFeature([ProductEntity]),
    TypeOrmModule.forFeature([CategoryEntity]),
    TypeOrmModule.forFeature([StoreEntity]),
    TypeOrmModule.forFeature([ProductVariantEntity]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepositoryProvider],
})
export class ProductModule {}
