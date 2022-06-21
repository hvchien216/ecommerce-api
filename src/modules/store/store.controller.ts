import { RoleType } from '@/constants/role-type';
import { Auth, UUIDParam } from '@/decorators/http.decorators';
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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateStoreRequestDto,
  LinkEmployeeToStoreRequestDto,
  StoreResponseDto,
  UpdateStoreRequestDto,
} from './dtos';
import { StoreService } from './store.service';

@ApiTags('Store')
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
  @Auth([RoleType.USER, RoleType.ADMIN])
  async getStoreById(
    @UUIDParam('id') storeId: Uuid,
  ): Promise<StoreResponseDto> {
    return this.storeService.getStoreById(storeId);
  }

  @ApiOperation({ description: 'Create Store' })
  @Post()
  @Auth([RoleType.USER, RoleType.ADMIN])
  async createStore(
    @Body(ValidationPipe) createStoreDto: CreateStoreRequestDto,
  ): Promise<StoreResponseDto> {
    return this.storeService.create(createStoreDto);
  }

  @ApiOperation({ description: 'Update Store' })
  @Put('/:id')
  async updateStore(
    @UUIDParam('id') storeId: Uuid,
    @Body(ValidationPipe) updateStoreRequestDto: UpdateStoreRequestDto,
  ): Promise<StoreResponseDto> {
    return this.storeService.update(storeId, updateStoreRequestDto);
  }

  @ApiOperation({ description: 'Link employees for store' })
  @Put('/:id/link-employees')
  async linkEmployeesToStore(
    @UUIDParam('id') storeId: Uuid,
    @Body(ValidationPipe) data: LinkEmployeeToStoreRequestDto,
  ): Promise<StoreResponseDto> {
    const store = await this.storeService.linkEmployees(storeId, data);

    return store;
  }
}
