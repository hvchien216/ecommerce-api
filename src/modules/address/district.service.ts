import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DistrictEntity } from './district.entity';
import { DistrictMapper } from './district.mapper';
import { DistrictResponseDto } from './dtos';

@Injectable()
export class DistrictService {
  constructor(
    @InjectRepository(DistrictEntity)
    private districtRepository: Repository<DistrictEntity>,
  ) {}

  async getListById(provinceId: Uuid): Promise<DistrictResponseDto[]> {
    const districtEntities = await this.districtRepository.find({
      where: {
        province_id: provinceId,
      },
    });
    return await Promise.all(districtEntities.map(DistrictMapper.toDto));
  }
}
