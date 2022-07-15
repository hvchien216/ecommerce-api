import { DistrictEntity } from './district.entity';
import { DistrictResponseDto } from './dtos';

export class DistrictMapper {
  public static toDto(entity: DistrictEntity): DistrictResponseDto {
    const dto = new DistrictResponseDto(entity);
    return dto;
  }
}
