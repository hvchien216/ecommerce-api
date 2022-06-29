// https://github.com/nestjs/typeorm/issues/14
import {
  Pagination,
  PaginationRequest,
  PaginationResponseDto,
} from '@/libs/pagitation';
import { Helpers } from '@/utils/helpers';
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
import { AttributeMapper } from '../attribute/attribute.mapper';
import { CategoryEntity } from '../category/category.entity';
import { UpdateProductVariantsRequestDto } from '../product-variant/dtos';
import { ProductVariantEntity } from '../product-variant/product-variant.entity';
import { ProductVariantMapper } from '../product-variant/product-variant.mapper';
import { ProductVariantService } from '../product-variant/product-variant.service';
import { StoreEntity } from '../store/store.entity';
import {
  CreateProductRequestDto,
  ProductResponseDto,
  QueryProductsRequestDto,
} from './dtos';
import { ProductMapper } from './product.mapper';
import { ProductsRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductsRepository')
    private productRepository: ProductsRepository,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(ProductVariantEntity)
    private productVariantRepository: Repository<ProductVariantEntity>,
    @InjectRepository(StoreEntity)
    private storeRepository: Repository<StoreEntity>,
    private productVariantService: ProductVariantService,
    private helpers: Helpers,
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
    const { categoryId, storeId, attributes } = createProductDto;

    const storeEntity = await this.storeRepository.findOne(storeId);

    if (!storeEntity) {
      throw new HttpException(
        { message: 'Store not found' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const categoryEntity = await this.categoryRepository.findOne(categoryId);

    if (!categoryEntity) {
      throw new HttpException(
        { message: 'Category not found' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const attributeEntities = await Promise.all(
      attributes.map(AttributeMapper.toCreateEntity),
    );

    const productVariants =
      this.productVariantService.generateModels(attributeEntities);

    const productVariantEntities = (await productVariants).map((pV) => {
      const productVariantEntity =
        ProductVariantMapper.toCreateEntityWithAttributeItems({
          name: pV.name,
          price: 0,
          quantity: 0,
        });
      productVariantEntity.attributeItems = pV.entities;
      return productVariantEntity;
    });

    let productEntity = ProductMapper.toCreateEntity(createProductDto);
    productEntity.category = categoryEntity;
    productEntity.storeOwner = storeEntity;
    productEntity.attributes = attributeEntities;
    productEntity.variants = productVariantEntities;

    productEntity = await this.productRepository.save(productEntity);

    return ProductMapper.toDtoWithRelations(productEntity);
  }

  async getProduct(productId: Uuid): Promise<ProductResponseDto> {
    const productEntity = await this.productRepository.findOne(productId, {
      relations: ['variants', 'category', 'storeOwner'],
    });

    if (!productEntity) {
      throw new HttpException(
        { message: 'Product not found' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return ProductMapper.toDtoWithRelations(productEntity);
  }

  async updateInventory(
    productId: Uuid,
    { models }: { models: UpdateProductVariantsRequestDto[] },
  ): Promise<ProductResponseDto> {
    let productEntity = await this.productRepository.findOne(productId, {
      relations: ['variants', 'category', 'storeOwner'],
    });

    if (!productEntity) {
      throw new HttpException(
        { message: 'Product not found' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const pVariantIds = models.map(
      ({ product_variant_id }) => product_variant_id,
    );

    let productVariants = await this.productVariantRepository.findByIds(
      pVariantIds,
    );

    productVariants = productVariants.map<ProductVariantEntity>((pV) => {
      const pVMatched = models.find((m) => m.product_variant_id === pV.id);

      return !pVMatched
        ? pV
        : { ...pV, price: pVMatched.price, quantity: pVMatched.quantity };
    });

    productEntity = ProductMapper.toUpdateModelsOfEntity(
      productEntity,
      productVariants,
    );

    const { min: priceMin, max: priceMax } = this.helpers.getMinMax(
      productVariants,
      'price',
    );

    productEntity.price = priceMin;
    productEntity.price_min = priceMin;
    productEntity.price_max = priceMax;

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
// const attributes = [
//   {
//     attribute: 'Color',
//     attribute_items: ['Yellow', 'Green', 'Red'],
//   },
//   {
//     attribute: 'Size',
//     attribute_items: ['S', 'M', 'L'],
//   },
// ];

// const variants = [
//   {
//     ID: 1,
//     name: 'Yellow,S',
//   },
//   {
//     ID: 2,
//     name: 'Yellow,M',
//   },
//   {
//     ID: 3,
//     name: 'Yellow,L',
//   },
//   {
//     ID: 4,
//     name: 'Green,S',
//   },
//   {
//     ID: 5,
//     name: 'Green,M',
//   },
//   {
//     ID: 6,
//     name: 'Green,L',
//   },
//   {
//     ID: 7,
//     name: 'Red,S',
//   },
//   {
//     ID: 8,
//     name: 'Red,M',
//   },
//   {
//     ID: 9,
//     name: 'Red,L',
//   },
// ];
// //Table attribute_item
// id      name
// 1       Yellow
// 2       Green
// 3       Red
// 4       S
// 5       M
// 6       L

// //Table product_variants_attribute_item
// id  product_variant_id attribute_item_id
// 1    1                  1
// 2    1                  4
// 3    2                  1
// 4    2                  5
