import { Auth, UUIDParam } from '@/decorators/http.decorators';
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
import { OrderService } from './order.service';
import { OrderResponseDto, CreateOrderRequestDto } from './dtos';
import { UserEntity } from '../user/user.entity';
import { AuthUser } from '@/decorators/auth-user.decorator';
import { RoleType } from '@/constants/role-type';

@ApiTags('Order')
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  // @ApiOperation({ description: 'Get a paginated store list' })
  // @Get()
  // async getStores(): Promise<OrderResponseDto[]> {
  //   return this.orderService.getCategories();
  // }

  @ApiOperation({ description: 'create order' })
  @Post()
  @Auth([RoleType.USER, RoleType.ADMIN])
  async createOrder(
    @AuthUser() currentUser: UserEntity,
    @Body(ValidationPipe)
    createOrderRequestDto: CreateOrderRequestDto,
  ): Promise<OrderResponseDto> {
    return this.orderService.create(currentUser, createOrderRequestDto);
  }

  // @ApiOperation({ description: 'update category' })
  // @Put('/:id')
  // async updateCategory(
  //   @UUIDParam('id') categoryId: Uuid,
  //   updateCategoryRequestDto: CreateOrderRequestDto,
  // ): Promise<OrderResponseDto> {
  //   return this.orderService.update(categoryId, updateCategoryRequestDto);
  // }

  // @ApiOperation({ description: 'remove category' })
  // @Delete('/:id')
  // async removeCategory(@UUIDParam('id') categoryId: Uuid): Promise<boolean> {
  //   return this.orderService.softDelete(categoryId);
  // }

  // @ApiOperation({ description: 'restore category deleted' })
  // @Put('/:id/restore')
  // async restoredCategory(@UUIDParam('id') categoryId: Uuid): Promise<boolean> {
  //   return this.orderService.restoreDeleted(categoryId);
  // }
}
