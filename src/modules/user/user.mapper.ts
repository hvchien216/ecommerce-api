import { CreateUserRequestDto } from './dtos/user-register-request.dto';
import { ProfileEntity } from '../profile/profile.entity';
import { ProfileMapper } from '../profile/profile.mapper';
import { UserResponseDto } from './dtos/user.dto';
import { UserEntity } from './user.entity';
import { RoleType } from '@/constants/role-type';

export class UserMapper {
  public static toDto(entity: UserEntity): UserResponseDto {
    const dto = new UserResponseDto(entity);
    return dto;
  }
  public static toDtoWithRelations(entity: UserEntity): UserResponseDto {
    const dto = new UserResponseDto(entity);
    dto.profile = ProfileMapper.toDto(entity.profile);
    return dto;
  }

  public static toCreateEntity(dto: CreateUserRequestDto): UserEntity {
    const entity = new UserEntity();
    entity.name = dto.name;
    entity.username = dto.username;
    entity.password = dto.password;
    entity.role = RoleType.USER;
    entity.profile = new ProfileEntity(dto.profile);
    return entity;
  }

  //   public static toUpdateEntity(entity: UserEntity, dto: UpdateUserRequestDto): UserEntity {
  //     entity.username = dto.username;
  //     entity.firstName = dto.firstName;
  //     entity.lastName = dto.lastName;
  //     entity.permissions = Promise.resolve(dto.permissions.map((id) => new PermissionEntity({ id })));
  //     entity.roles = Promise.resolve(dto.roles.map((id) => new RoleEntity({ id })));
  //     entity.status = dto.status;
  //     return entity;
  //   }
}
