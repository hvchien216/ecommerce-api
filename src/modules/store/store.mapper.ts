import { UserMapper } from '../user/user.mapper';
import { CreateStoreRequestDto } from './dtos/create-store-request.dto';
import { StoreResponseDto } from './dtos/store-response.dto';
import { UpdateStoreRequestDto } from './dtos/update-store-request.dto';
import { StoreEntity } from './store.entity';

export class StoreMapper {
  public static toDto(entity: StoreEntity): StoreResponseDto {
    const dto = new StoreResponseDto(entity);
    return dto;
  }
  public static async toDtoWithRelations(
    entity: StoreEntity,
  ): Promise<StoreResponseDto> {
    const dto = new StoreResponseDto(entity);
    dto.employees = await Promise.all(
      (await entity.employees).map(UserMapper.toDtoWithRelations),
    );
    return dto;
  }

  public static toCreateEntity(dto: CreateStoreRequestDto): StoreEntity {
    const entity = new StoreEntity();
    entity.name = dto.name;
    entity.bio = dto.bio;
    entity.slug = dto.slug;
    return entity;
  }

  public static toUpdateEntity(
    entity: StoreEntity,
    dto: UpdateStoreRequestDto,
  ): StoreEntity {
    entity.bio = dto.bio;
    return entity;
  }
}
