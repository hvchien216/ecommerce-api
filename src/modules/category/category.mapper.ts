import { CategoryEntity } from './category.entity';
import { CategoryResponseDto, CreateUpdateCategoryRequestDto } from './dtos';

export class CategoryMapper {
  public static toDto(entity: CategoryEntity): CategoryResponseDto {
    const dto = new CategoryResponseDto(entity);
    return dto;
  }

  public static async toDtoWithRelations(
    entity: CategoryEntity,
  ): Promise<CategoryResponseDto> {
    const dto = new CategoryResponseDto(entity);
    if (entity.childCategories?.length) {
      dto.children = await Promise.all(
        (await entity.childCategories)?.map(CategoryMapper.toDtoWithRelations),
      );
    } else {
      dto.children = null;
    }

    return dto;
  }

  public static toCreateEntity(
    dto: CreateUpdateCategoryRequestDto,
  ): CategoryEntity {
    const entity = new CategoryEntity();
    entity.title = dto.title;
    if (dto.description) {
      entity.description = dto.description;
    }
    if (dto.parent_id) {
      entity.parent_id = dto.parent_id;
    }
    entity.description = dto.description;
    entity.parent_id = dto.parent_id;
    return entity;
  }

  public static toUpdateEntity(
    entity: CategoryEntity,
    dto: CreateUpdateCategoryRequestDto,
  ): CategoryEntity {
    entity.title = dto.title;
    if (dto.description) {
      entity.description = dto.description;
    }
    if (dto.parent_id) {
      entity.parent_id = dto.parent_id;
    }
    return entity;
  }
}
