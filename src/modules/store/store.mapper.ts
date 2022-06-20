import { CreateStoreRequestDto } from './dtos/create-store-request.dto';
import { StoreResponseDto } from './dtos/store-response.dto';
import { UpdateStoreRequestDto } from './dtos/update-store-request.dto copy';
import { StoreEntity } from './store.entity';

export class StoreMapper {
  public static toDto(entity: StoreEntity): StoreResponseDto {
    const dto = new StoreResponseDto(entity);
    return dto;
  }
  // public static toDtoWithRelations(entity: UserEntity): UserResponseDto {
  //   const dto = new UserResponseDto(entity);
  //   dto.profile = ProfileMapper.toDto(entity.profile);
  //   return dto;
  // }

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
