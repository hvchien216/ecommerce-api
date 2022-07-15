import { WardResponseDto } from './dtos';
import { WardEntity } from './ward.entity';

export class WardMapper {
  public static toDto(entity: WardEntity): WardResponseDto {
    const dto = new WardResponseDto(entity);
    return dto;
  }
}
