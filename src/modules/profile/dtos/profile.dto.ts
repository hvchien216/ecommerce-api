import { AbstractDto } from '@/common/dto/abstract.dto';
import { GenderType } from '@/constants/gener-type';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ProfileEntity } from '../profile.entity';

export class ProfileDto extends AbstractDto {
  @ApiPropertyOptional()
  gender: GenderType;

  @ApiPropertyOptional()
  phone: string;

  @ApiPropertyOptional()
  avatar: string;

  @ApiPropertyOptional()
  email: string;

  @ApiPropertyOptional()
  address: string;

  constructor(profile: ProfileEntity) {
    super(profile);

    this.gender = profile.gender;
    this.phone = profile.phone;
    this.avatar = profile.avatar;
    this.email = profile.email;
    this.address = profile.address;
  }
}
