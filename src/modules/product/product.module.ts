import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../category/category.entity';
import { StoreEntity } from '../store/store.entity';
import { ProductController } from './product.controller';
import { ProductEntity } from './product.entity';
import { ImageRepositoryProvider } from './product.repository';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    TypeOrmModule.forFeature([CategoryEntity]),
    TypeOrmModule.forFeature([StoreEntity]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ImageRepositoryProvider],
})
export class ProductModule {}
