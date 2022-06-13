import { AbstractEntity, IAbstractEntity } from '../../common/abstract.entity';
import { Column, Entity } from 'typeorm';
import { UserDto, UserDtoOptions } from './dtos/user.dto';
import { RoleType } from '../../constants';
import { UseDto } from '../../decorators';
import { GenderType } from '@/constants/gener-type';

export interface IUserEntity extends IAbstractEntity<UserDto> {
  username?: string;

  password?: string;

  role: RoleType;

  name?: string;

  phone?: string;

  gender?: GenderType;

  avatar?: string;

  address?: string;

  isActive?: boolean;
}

@Entity({ name: 'users' })
@UseDto(UserDto)
export class UserEntity
  extends AbstractEntity<UserDto, UserDtoOptions>
  implements IUserEntity
{
  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  role: RoleType;

  @Column()
  name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'enum', enum: GenderType, default: GenderType.MALE })
  gender: GenderType;

  @Column({ nullable: true })
  avatar: string;

  @Column()
  address: string;

  // @Column()
  // isActive: boolean;
}
