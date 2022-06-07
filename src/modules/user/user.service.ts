import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { FindOneOptions } from 'typeorm';
import { UserRegisterDto } from '../auth/dto/user-register.dto';
@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  findOne(findData: FindOneOptions<UserEntity>): Promise<UserEntity> {
    return this.userRepository.findOne(findData);
  }

  async create(userRegisterDto: UserRegisterDto): Promise<UserEntity> {
    const user = this.userRepository.create(userRegisterDto);

    await this.userRepository.save(user);

    return user;
  }
}
