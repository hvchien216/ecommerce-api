import { CategoryMapper } from '../category/category.mapper';
import { ProductVariantEntity } from '../product-variant/product-variant.entity';
import { ProductVariantMapper } from '../product-variant/product-variant.mapper';
import { StoreMapper } from '../store/store.mapper';
import {
  CreateProductRequestDto,
  ProductResponseDto,
  UpdateProductRequestDto,
} from './dtos';
import { ProductEntity } from './product.entity';

export class ProductMapper {
  public static toDto(entity: ProductEntity): ProductResponseDto {
    const dto = new ProductResponseDto(entity);
    return dto;
  }
  public static async toDtoWithRelations(
    entity: ProductEntity,
  ): Promise<ProductResponseDto> {
    const dto = new ProductResponseDto(entity);
    dto.category = CategoryMapper.toDto(entity.category);
    dto.storeOwner = StoreMapper.toDto(entity.storeOwner);
    dto.models = await Promise.all(
      entity.variants.map((v) => ProductVariantMapper.toDto(v)),
    );
    dto.storeOwner = StoreMapper.toDto(entity.storeOwner);
    return dto;
  }

  public static toCreateEntity(dto: CreateProductRequestDto): ProductEntity {
    const entity = new ProductEntity();
    entity.title = dto.title;
    entity.description = dto.description;
    entity.slug = dto.slug;
    entity.thumbnail = dto.thumbnail;
    entity.images = dto.images;
    entity.code = dto.code;
    entity.status = dto.status;
    return entity;
  }

  public static toUpdateEntity(
    entity: ProductEntity,
    dto: UpdateProductRequestDto,
  ): ProductEntity {
    entity.title = dto.title;
    entity.description = dto.description;
    entity.thumbnail = dto.thumbnail;
    entity.images = dto.images;
    entity.status = dto.status;
    return entity;
  }

  public static toUpdateModelsOfEntity(
    entity: ProductEntity,
    variants: ProductVariantEntity[],
  ): ProductEntity {
    entity.variants = variants;
    return entity;
  }
}
