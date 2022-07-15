import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WardResponseDto } from './dtos';
import { WardEntity } from './ward.entity';
import { WardMapper } from './ward.mapper';

@Injectable()
export class WardService {
  constructor(
    @InjectRepository(WardEntity)
    private wardRepository: Repository<WardEntity>,
  ) {}

  async getListById(districtId: Uuid): Promise<WardResponseDto[]> {
    const wardEntities = await this.wardRepository.find({
      where: {
        district_id: districtId,
      },
    });
    return await Promise.all(wardEntities.map(WardMapper.toDto));
  }
}
