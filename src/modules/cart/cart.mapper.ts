import { CartLineEntity } from './cart-line.entity';
import { CreateCartLineDto } from './dtos';

export class CartMapper {
  // public static toDto(entity: ProductEntity): ProductResponseDto {
  //   const dto = new ProductResponseDto(entity);
  //   return dto;
  // }
  // public static async toDtoWithRelations(
  //   entity: ProductEntity,
  // ): Promise<ProductResponseDto> {
  //   const dto = new ProductResponseDto(entity);
  //   dto.category = CategoryMapper.toDto(entity.category);
  //   dto.storeOwner = StoreMapper.toDto(entity.storeOwner);
  //   dto.models = await Promise.all(
  //     entity.variants.map((v) => ProductVariantMapper.toDto(v)),
  //   );
  //   dto.storeOwner = StoreMapper.toDto(entity.storeOwner);
  //   return dto;
  // }

  public static toCreateEntity(dto: CreateCartLineDto): CartLineEntity {
    const entity = new CartLineEntity(dto);
    return entity;
  }

  // public static toUpdateEntity(
  //   entity: ProductEntity,
  //   dto: UpdateProductRequestDto,
  // ): ProductEntity {
  //   entity.title = dto.title;
  //   entity.description = dto.description;
  //   entity.thumbnail = dto.thumbnail;
  //   entity.images = dto.images;
  //   entity.status = dto.status;
  //   return entity;
  // }
}
