import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressController } from './address.controller';
import { AddressEntity } from './address.entity';
import { AddressService } from './address.service';
import { DistrictController } from './district.controller';
import { DistrictEntity } from './district.entity';
import { DistrictService } from './district.service';
import { ProvinceController } from './province.controller';
import { ProvinceEntity } from './province.entity';
import { ProvinceService } from './province.service';
import { WardController } from './ward.controller';
import { WardEntity } from './ward.entity';
import { WardService } from './ward.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AddressEntity]),
    TypeOrmModule.forFeature([ProvinceEntity]),
    TypeOrmModule.forFeature([DistrictEntity]),
    TypeOrmModule.forFeature([WardEntity]),
  ],
  controllers: [
    AddressController,
    ProvinceController,
    DistrictController,
    WardController,
  ],
  providers: [AddressService, ProvinceService, DistrictService, WardService],
})
export class AddressModule {}
