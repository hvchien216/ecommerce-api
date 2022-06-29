import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../category/category.entity';
import { StoreEntity } from '../store/store.entity';
import { ProductVariantController } from './product-variant.controller';
import { ProductVariantEntity } from './product-variant.entity';
import { ProductVariantService } from './product-variant.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductVariantEntity]),
    TypeOrmModule.forFeature([CategoryEntity]),
    TypeOrmModule.forFeature([StoreEntity]),
  ],
  controllers: [ProductVariantController],
  providers: [ProductVariantService],
  exports: [ProductVariantService],
})
export class ProductVariantModule {}
