import { CategoryMapper } from '../category/category.mapper';
import { StoreMapper } from '../store/store.mapper';
import {
  CreateAttributeInProductRequestDto,
  AttributeResponseDto,
  UpdateAttributeRequestDto,
} from './dtos';
import { AttributeEntity } from './attribute.entity';
import { AttributeItemEntity } from '../attribute-item/attribute-item.entity';

export class AttributeMapper {
  public static toDto(entity: AttributeEntity): AttributeResponseDto {
    const dto = new AttributeResponseDto(entity);
    return dto;
  }
  public static async toDtoWithRelations(
    entity: AttributeEntity,
  ): Promise<AttributeResponseDto> {
    const dto = new AttributeResponseDto(entity);
    // dto.category = CategoryMapper.toDto(entity.category);
    // dto.storeOwner = StoreMapper.toDto(entity.storeOwner);
    return dto;
  }

  public static toCreateEntity(
    dto: CreateAttributeInProductRequestDto,
  ): AttributeEntity {
    const entity = new AttributeEntity();
    entity.name = dto.name;
    entity.attribute_items = dto.attribute_items.map(
      (value) => new AttributeItemEntity({ value }),
    );
    return entity;
  }

  public static toUpdateEntity(
    entity: AttributeEntity,
    dto: UpdateAttributeRequestDto,
  ): AttributeEntity {
    // entity.title = dto.title;
    // entity.description = dto.description;
    // entity.thumbnail = dto.thumbnail;
    // entity.images = dto.images;
    // entity.status = dto.status;
    return entity;
  }
}
