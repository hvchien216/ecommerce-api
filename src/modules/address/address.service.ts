import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { AddressEntity } from './address.entity';
import { AddressMapper } from './address.mapper';
import {
  AddressResponseDto,
  CreateAddressRequestDto,
  UpdateAddressRequestDto,
} from './dtos';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,
  ) {}

  async getListByUser(user: UserEntity): Promise<AddressResponseDto[]> {
    const [addressEntities] = await this.getListAndCount(user);
    return await Promise.all(
      addressEntities.map(AddressMapper.toDtoWithRelations),
    );
  }

  private async getListAndCount(
    user: UserEntity,
  ): Promise<[AddressEntity[], number]> {
    const result = await this.addressRepository.findAndCount({
      relations: ['province', 'district', 'ward'],
      where: {
        user_id: user.id,
      },
    });

    return result;
  }

  async create(
    user: UserEntity,
    createAddressRequestDto: CreateAddressRequestDto,
  ): Promise<AddressResponseDto> {
    let addressEntity = AddressMapper.toCreateEntity(
      user,
      createAddressRequestDto,
    );

    // const [_, count] = await this.getListAndCount(user);

    // if (count < 1) {
    //   addressEntity.is_default = true;
    // }
    console.log('addressEntity====>', addressEntity);
    addressEntity = await this.addressRepository.save(addressEntity);

    // if (addressEntity.is_default) {
    //   await this.addressToOptions(user, addressEntity.id);
    // }

    return AddressMapper.toDto(addressEntity);
  }

  async update(
    user: UserEntity,
    updateAddressRequestDto: UpdateAddressRequestDto,
  ): Promise<AddressResponseDto> {
    let addressEntity = await this.addressRepository.findOne(
      updateAddressRequestDto.address_id,
    );

    addressEntity = AddressMapper.toUpdateEntity(
      addressEntity,
      user,
      updateAddressRequestDto,
    );

    addressEntity = await this.addressRepository.save(addressEntity);

    if (addressEntity.is_default) {
      await this.addressToOptions(user, addressEntity.id);
    }

    return AddressMapper.toDto(addressEntity);
  }

  async delete(user: UserEntity, addressId: Uuid): Promise<boolean> {
    const deleteResponse = await this.addressRepository.delete({
      user_id: user.id,
      id: addressId,
    });

    if (!deleteResponse.affected) {
      throw new NotFoundException();
    }

    return true;
  }

  private async addressToOptions(user: UserEntity, address_id: Uuid) {
    let entities = await this.addressRepository.find({
      where: {
        user_id: user.id,
        id: Not(address_id),
      },
    });

    entities = entities.map((entity) => ({
      ...entity,
      is_default: false,
    }));

    await this.addressRepository.save(entities);
  }
}
