// https://github.com/nestjs/typeorm/issues/14
import {
  Pagination,
  PaginationRequest,
  PaginationResponseDto,
} from '@/libs/pagitation';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeoutError } from 'rxjs';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../category/category.entity';
import { StoreEntity } from '../store/store.entity';
import { CreateProductRequestDto, ProductResponseDto } from './dtos';
import { QueryProductsRequestDto } from './dtos/query-products-request.dto';
import { ProductMapper } from './product.mapper';
import { ProductsRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductsRepository')
    private productRepository: ProductsRepository,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(StoreEntity)
    private storeRepository: Repository<StoreEntity>,
  ) {}

  async getList(
    pagination: PaginationRequest<QueryProductsRequestDto>,
  ): Promise<PaginationResponseDto<ProductResponseDto>> {
    try {
      const [productEntities, totalProducts] =
        await this.productRepository.getProductsAndCount(pagination);

      const ProductDtos = await Promise.all(
        productEntities.map(ProductMapper.toDtoWithRelations),
      );
      return Pagination.of(pagination, totalProducts, ProductDtos);
    } catch (error) {
      console.log('error========', error);
      if (error instanceof NotFoundException) {
        throw new NotFoundException();
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async create(
    createProductDto: CreateProductRequestDto,
  ): Promise<ProductResponseDto> {
    const storeEntity = await this.storeRepository.findOne(
      createProductDto.storeId,
    );

    if (!storeEntity) {
      throw new HttpException(
        { message: 'Store not found' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const categoryEntity = await this.categoryRepository.findOne(
      createProductDto.categoryId,
    );

    if (!categoryEntity) {
      throw new HttpException(
        { message: 'Category not found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    console.log(
      'productRepository===>',
      this.productRepository.getProductsAndCount,
    );
    let productEntity = ProductMapper.toCreateEntity(createProductDto);
    productEntity.category = categoryEntity;
    productEntity.storeOwner = storeEntity;

    productEntity = await this.productRepository.save(productEntity);

    return ProductMapper.toDtoWithRelations(productEntity);
  }

  // async update(
  //   category_id: Uuid,
  //   updateCategoryDto: CreateUpdateCategoryRequestDto,
  // ): Promise<CategoryResponseDto> {
  //   let categoryEntity = await this.productRepository.findOne(category_id);

  //   if (!categoryEntity) {
  //     throw new NotFoundException();
  //   }

  //   categoryEntity = CategoryMapper.toUpdateEntity(
  //     categoryEntity,
  //     updateCategoryDto,
  //   );

  //   categoryEntity = await this.productRepository.save(categoryEntity);

  //   return CategoryMapper.toDto(categoryEntity);
  // }

  // async softDelete(category_id: Uuid): Promise<boolean> {
  //   const deleteResponse = await this.productRepository.softDelete(
  //     category_id,
  //   );

  //   if (!deleteResponse.affected) {
  //     throw new NotFoundException();
  //   }

  //   return true;
  // }

  // async restoreDeleted(id: Uuid): Promise<boolean> {
  //   const restoreResponse = await this.productRepository.restore(id);
  //   if (!restoreResponse.affected) {
  //     throw new NotFoundException();
  //   }
  //   return true;
  // }
}
