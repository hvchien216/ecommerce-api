import { RoleType } from '@/constants/role-type';
import { AuthUser } from '@/decorators/auth-user.decorator';
import { Auth } from '@/decorators/http.decorators';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../user/user.entity';
import { AddressService } from './address.service';
import {
  AddressResponseDto,
  CreateAddressRequestDto,
  UpdateAddressRequestDto,
} from './dtos';

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @ApiOperation({ description: 'Get a address list' })
  @Get()
  @Auth([RoleType.USER, RoleType.ADMIN])
  async getListByUser(
    @AuthUser() user: UserEntity,
  ): Promise<AddressResponseDto[]> {
    return this.addressService.getListByUser(user);
  }

  @ApiOperation({ description: 'create address' })
  @Post()
  @Auth([RoleType.USER, RoleType.ADMIN])
  async createAddress(
    @AuthUser() user: UserEntity,
    @Body(ValidationPipe)
    createAddressRequestDto: CreateAddressRequestDto,
  ): Promise<AddressResponseDto> {
    return this.addressService.create(user, createAddressRequestDto);
  }

  @ApiOperation({ description: 'update address by id' })
  @Put()
  @Auth([RoleType.USER, RoleType.ADMIN])
  async updateAddress(
    @AuthUser() user: UserEntity,
    @Body(ValidationPipe)
    updateAddressReqDto: UpdateAddressRequestDto,
  ): Promise<AddressResponseDto> {
    return this.addressService.update(user, updateAddressReqDto);
  }

  @ApiOperation({ description: 'update address by id' })
  @Delete()
  @Auth([RoleType.USER, RoleType.ADMIN])
  async deleteAddress(
    @AuthUser() user: UserEntity,
    @Body(ValidationPipe)
    deleteAddressRequestDto: {
      address_id: Uuid;
    },
  ): Promise<boolean> {
    return this.addressService.delete(user, deleteAddressRequestDto.address_id);
  }
}
