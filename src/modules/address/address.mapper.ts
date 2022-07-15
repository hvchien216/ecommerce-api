import { UserEntity } from '../user/user.entity';
import { AddressEntity } from './address.entity';
import { DistrictMapper } from './district.mapper';
import {
  AddressResponseDto,
  CreateAddressRequestDto,
  UpdateAddressRequestDto,
} from './dtos';
import { ProvinceMapper } from './province.mapper';
import { WardMapper } from './ward.mapper';

export class AddressMapper {
  public static toDto(entity: AddressEntity): AddressResponseDto {
    const dto = new AddressResponseDto(entity);
    return dto;
  }

  public static async toDtoWithRelations(
    entity: AddressEntity,
  ): Promise<AddressResponseDto> {
    const dto = new AddressResponseDto(entity);
    dto.province = ProvinceMapper.toDto(entity.province);
    dto.district = DistrictMapper.toDto(entity.district);
    dto.ward = WardMapper.toDto(entity.ward);
    return dto;
  }

  public static toCreateEntity(
    user: UserEntity,
    dto: CreateAddressRequestDto,
  ): AddressEntity {
    const entity = new AddressEntity();
    entity.user_id = user.id;
    entity.province_id = dto.province_id;
    entity.district_id = dto.district_id;
    entity.ward_id = dto.ward_id;
    entity.is_default = dto.is_default;
    entity.street = dto.street;
    return entity;
  }

  public static toUpdateEntity(
    entity: AddressEntity,
    user: UserEntity,
    dto: UpdateAddressRequestDto,
  ): AddressEntity {
    entity.id = dto.address_id;
    entity.user_id = user.id;
    entity.province_id = dto.province_id;
    entity.district_id = dto.district_id;
    entity.ward_id = dto.ward_id;
    entity.is_default = dto.is_default;
    entity.street = dto.street;
    return entity;
  }
}
