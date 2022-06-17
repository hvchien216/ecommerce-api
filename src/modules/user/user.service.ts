import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserRequestDto } from './dtos/user-register-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import isNil from 'lodash/isNil';
import { UserMapper } from './users.mapper';
import { UserResponseDto } from './dtos/user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  findOne(findData: FindOneOptions<UserEntity>): Promise<UserEntity> {
    return this.userRepository.findOne(findData);
  }

  async create(
    userRegisterDto: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    const foundUser = await this.userRepository.findOne({
      where: {
        username: userRegisterDto.username,
      },
    });

    if (!isNil(foundUser)) {
      throw new ForbiddenException('Credentials taken');
    }

    let userEntity = UserMapper.toCreateEntity(userRegisterDto);
    userEntity = await this.userRepository.save(userEntity);

    return UserMapper.toDtoWithRelations(userEntity);
  }
}
