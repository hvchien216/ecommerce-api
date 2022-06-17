import { ProfileDto } from './dtos/profile.dto';
import { ProfileEntity } from './profile.entity';

export class ProfileMapper {
  public static toDto(entity: ProfileEntity): ProfileDto {
    const dto = new ProfileDto(entity);
    return dto;
  }
}
