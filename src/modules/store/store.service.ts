import {
  Pagination,
  PaginationRequest,
  PaginationResponseDto,
} from '@/libs/pagitation';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeoutError } from 'rxjs';
import { Repository } from 'typeorm';
import {
  CreateStoreRequestDto,
  StoreResponseDto,
  UpdateStoreRequestDto,
} from './dtos';
import { StoreEntity } from './store.entity';
import { StoreMapper } from './store.mapper';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(StoreEntity)
    private storeRepository: Repository<StoreEntity>,
  ) {}

  async getStores(
    pagination: PaginationRequest,
  ): Promise<PaginationResponseDto<StoreResponseDto>> {
    try {
      const [storeEntities, totalStores] =
        await this.storeRepository.findAndCount(pagination);

      const StoreDtos = await Promise.all(storeEntities.map(StoreMapper.toDto));
      return Pagination.of(pagination, totalStores, StoreDtos);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException();
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getStoreById(storeId: Uuid): Promise<StoreResponseDto> {
    const storeEntity = await this.storeRepository.findOne(storeId);

    if (!storeEntity) {
      throw new NotFoundException();
    }

    return StoreMapper.toDto(storeEntity);
  }

  async create(
    createStoreRequestDto: CreateStoreRequestDto,
  ): Promise<StoreResponseDto> {
    let storeEntity = StoreMapper.toCreateEntity(createStoreRequestDto);

    storeEntity = await this.storeRepository.save(storeEntity);

    return StoreMapper.toDto(storeEntity);
  }

  async update(
    storeId: Uuid,
    updateStoreRequestDto: UpdateStoreRequestDto,
  ): Promise<StoreResponseDto> {
    let storeEntity = await this.storeRepository.findOne(storeId);

    if (!storeEntity) {
      throw new NotFoundException();
    }

    storeEntity = StoreMapper.toUpdateEntity(
      storeEntity,
      updateStoreRequestDto,
    );

    storeEntity = await this.storeRepository.save(storeEntity);

    return StoreMapper.toDto(storeEntity);
  }
}
