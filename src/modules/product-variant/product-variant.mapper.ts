import {
  ProductVariantsResponseDto,
  CreateProductVariantsRequestDto,
  UpdateProductVariantsRequestDto,
} from './dtos';
import { ProductVariantEntity } from './product-variant.entity';

export class ProductVariantMapper {
  public static toDto(
    entity: ProductVariantEntity,
  ): ProductVariantsResponseDto {
    const dto = new ProductVariantsResponseDto(entity);
    return dto;
  }
  public static async toDtoWithRelations(
    entity: ProductVariantEntity,
  ): Promise<ProductVariantsResponseDto> {
    const dto = new ProductVariantsResponseDto(entity);
    // dto.category = CategoryMapper.toDto(entity.category);
    // dto.storeOwner = StoreMapper.toDto(entity.storeOwner);
    return dto;
  }

  public static toCreateEntity(
    dto: CreateProductVariantsRequestDto,
  ): ProductVariantEntity {
    const entity = new ProductVariantEntity();
    entity.name = dto.name;
    entity.quantity = dto.quantity;
    entity.price = dto.price;
    return entity;
  }

  public static toCreateEntityWithAttributeItems(
    dto: CreateProductVariantsRequestDto,
  ): ProductVariantEntity {
    const entity = new ProductVariantEntity();
    entity.name = dto.name;
    entity.quantity = dto.quantity;
    entity.price = dto.price;
    return entity;
  }

  public static toUpdateEntity(
    entity: ProductVariantEntity,
    dto: UpdateProductVariantsRequestDto,
  ): ProductVariantEntity {
    // entity.title = dto.title;
    // entity.description = dto.description;
    // entity.thumbnail = dto.thumbnail;
    // entity.images = dto.images;
    // entity.status = dto.status;
    return entity;
  }
}
