import { ProvinceResponseDto } from './dtos';
import { ProvinceEntity } from './province.entity';

export class ProvinceMapper {
  public static toDto(entity: ProvinceEntity): ProvinceResponseDto {
    const dto = new ProvinceResponseDto(entity);
    return dto;
  }
}
