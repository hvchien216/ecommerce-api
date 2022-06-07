import { AbstractEntity, IAbstractEntity } from 'src/common/abstract.entity';
import { RoleType } from 'src/constants';
import { UseDto } from 'src/decorators';
import { Column, Entity } from 'typeorm';
import { UserDto, UserDtoOptions } from './dtos/user.dto';

export interface IUserEntity extends IAbstractEntity<UserDto> {
  username: string;

  password: string;

  role: RoleType;

  name: string;

  isActive: boolean;
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

  @Column()
  isActive: boolean;
}
