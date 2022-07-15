import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProvinceResponseDto } from './dtos';
import { ProvinceEntity } from './province.entity';
import { ProvinceMapper } from './province.mapper';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectRepository(ProvinceEntity)
    private provinceRepository: Repository<ProvinceEntity>,
  ) {}

  async getList(): Promise<ProvinceResponseDto[]> {
    const provinceEntities = await this.provinceRepository.find();
    return await Promise.all(provinceEntities.map(ProvinceMapper.toDto));
  }
}
