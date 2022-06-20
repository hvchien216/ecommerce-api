import { UUIDParam } from '@/decorators/http.decorators';
import { PaginationResponseDto } from '@/libs/pagitation';
import { PaginationParams } from '@/libs/pagitation/decorators/pagination-params.decorator';
import { PaginationRequest } from '@/libs/pagitation/interfaces';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import {
  CreateStoreRequestDto,
  StoreResponseDto,
  UpdateStoreRequestDto,
} from './dtos';
import { StoreService } from './store.service';

@Controller('stores')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @ApiOperation({ description: 'Get a paginated store list' })
  @Get()
  async getStores(
    @PaginationParams() pagination: PaginationRequest,
  ): Promise<PaginationResponseDto<StoreResponseDto>> {
    return this.storeService.getStores(pagination);
  }

  @ApiOperation({ description: 'Get store by id' })
  @Get('/:id')
  async getStoreById(
    @UUIDParam('id') storeId: Uuid,
  ): Promise<StoreResponseDto> {
    return this.storeService.getStoreById(storeId);
  }

  @Post()
  async createStore(
    @Body(ValidationPipe) createStoreDto: CreateStoreRequestDto,
  ): Promise<StoreResponseDto> {
    return this.storeService.create(createStoreDto);
  }

  @Put('/:id')
  async updateStore(
    @UUIDParam('id') storeId: Uuid,
    @Body(ValidationPipe) updateStoreRequestDto: UpdateStoreRequestDto,
  ): Promise<StoreResponseDto> {
    return this.storeService.update(storeId, updateStoreRequestDto);
  }
}
