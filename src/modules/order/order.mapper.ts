import { OrderEntity } from './order.entity';
import { OrderResponseDto, CreateOrderRequestDto } from './dtos';

export class CategoryMapper {
  public static toDto(entity: OrderEntity): OrderResponseDto {
    const dto = new OrderResponseDto(entity);
    return dto;
  }

  public static async toDtoWithRelations(
    entity: OrderEntity,
  ): Promise<OrderResponseDto> {
    const dto = new OrderResponseDto(entity);
    // if (entity.childCategories?.length) {
    //   dto.children = await Promise.all(
    //     (await entity.childCategories)?.map(CategoryMapper.toDtoWithRelations),
    //   );
    // } else {
    //   dto.children = null;
    // }

    return dto;
  }

  public static toCreateEntity(dto: CreateOrderRequestDto): OrderEntity {
    const entity = new OrderEntity();
    // entity.title = dto.title;
    // if (dto.description) {
    //   entity.description = dto.description;
    // }
    // if (dto.parent_id) {
    //   entity.parent_id = dto.parent_id;
    // }
    // entity.description = dto.description;
    // entity.parent_id = dto.parent_id;
    return entity;
  }

  public static toUpdateEntity(
    entity: OrderEntity,
    dto: CreateOrderRequestDto,
  ): OrderEntity {
    // entity.title = dto.title;
    // if (dto.description) {
    //   entity.description = dto.description;
    // }
    // if (dto.parent_id) {
    //   entity.parent_id = dto.parent_id;
    // }
    return entity;
  }
}
