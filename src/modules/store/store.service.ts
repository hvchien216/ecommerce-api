import {
  Pagination,
  PaginationRequest,
  PaginationResponseDto,
} from '@/libs/pagitation';
import { Helpers } from '@/utils/helpers';
import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { profile } from 'console';
import { TimeoutError } from 'rxjs';
import { ILike, Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import {
  CreateStoreRequestDto,
  LinkEmployeeToStoreRequestDto,
  StoreResponseDto,
  UpdateStoreRequestDto,
} from './dtos';
import { QueryStoresRequestDto } from './dtos/query-stores-request.dto';
import { StoreEntity } from './store.entity';
import { StoreMapper } from './store.mapper';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(StoreEntity)
    private storeRepository: Repository<StoreEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private helpers: Helpers,
  ) {}

  async getStores(
    pagination: PaginationRequest<QueryStoresRequestDto>,
  ): Promise<PaginationResponseDto<StoreResponseDto>> {
    try {
      const {
        skip,
        limit: take,
        order,
        params: { q },
      } = pagination;
      const options = {
        skip,
        take,
        order,
        // relations: ['employees', 'employees.profile'],
        // select
      };

      if (q) {
        options['where'] = {
          name: ILike(`%${q}%`),
        };
      }

      const [storeEntities, totalStores] =
        await this.storeRepository.findAndCount(options);

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
    const storeEntity = await this.storeRepository.findOne({
      where: {
        id: storeId,
      },
      relations: ['employees', 'employees.profile'],
    });

    if (!storeEntity) {
      throw new NotFoundException();
    }

    return StoreMapper.toDtoWithRelations(storeEntity);
  }

  async create(
    user: UserEntity,
    createStoreRequestDto: CreateStoreRequestDto,
  ): Promise<StoreResponseDto> {
    const store = await this.storeRepository.findOne({
      where: {
        slug: createStoreRequestDto.slug,
      },
    });

    if (store) {
      const errors = { message: 'Slug must be unique.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    let storeEntity = StoreMapper.toCreateEntity(user, createStoreRequestDto);
    const { employeesId } = createStoreRequestDto;
    if (employeesId?.length > 0) {
      const users = await this.userRepository.findByIds(employeesId);

      const userExists = this.helpers.dataExists({
        data: users,
        dataIds: employeesId,
      });

      if (!userExists) {
        throw new HttpException(
          { message: 'User not found' },
          HttpStatus.BAD_REQUEST,
        );
      }

      storeEntity.employees = users;
    }

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

  async linkEmployees(
    storeId: Uuid,
    { employeesId }: LinkEmployeeToStoreRequestDto,
  ): Promise<StoreResponseDto> {
    let store = await this.storeRepository.findOne(storeId, {
      relations: ['employees', 'employees.profile'],
      // relations: ['employees', 'products'],
    });

    const users = await this.userRepository.findByIds(employeesId, {
      relations: ['profile'],
    });
    // const userExists = this.helpers.dataExists({
    //   data: users,
    //   dataIds: employeesId,
    // });

    console.log('store===>', store);

    if (!store) {
      throw new HttpException(
        { message: 'Store not found' },
        HttpStatus.BAD_REQUEST,
      );
    }

    // if (!userExists) {
    //   throw new HttpException(
    //     { message: 'User not found' },
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    store.employees.forEach((employee) => {
      employeesId.forEach((id) => {
        if (employee.id === id) {
          throw new HttpException(
            { message: 'Employee already registered to store' },
            HttpStatus.BAD_REQUEST,
          );
        }
      });
    });

    store.employees = [...store.employees, ...users];
    store = await this.storeRepository.save(store);

    return StoreMapper.toDtoWithRelations(store);
  }
}
