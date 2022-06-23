import {
  PaginationParams,
  PaginationRequest,
  PaginationResponseDto,
} from '@/libs/pagitation';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryResponseDto } from '../category/dtos';
import { CreateProductRequestDto, ProductResponseDto } from './dtos';
import { QueryProductsRequestDto } from './dtos/query-products-request.dto';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiOperation({ description: 'Get a paginated product no variant list' })
  @Get()
  async getStores(
    @PaginationParams() pagination: PaginationRequest<QueryProductsRequestDto>,
  ): Promise<PaginationResponseDto<CategoryResponseDto>> {
    return this.productService.getList(pagination);
  }

  @ApiOperation({ description: 'create category' })
  @Post()
  async createCategory(
    @Body(ValidationPipe)
    createCategoryRequestDto: CreateProductRequestDto,
  ): Promise<ProductResponseDto> {
    return this.productService.create(createCategoryRequestDto);
  }

  // @ApiOperation({ description: 'update category' })
  // @Put('/:id')
  // async updateCategory(
  //   @UUIDParam('id') categoryId: Uuid,
  //   updateCategoryRequestDto: CreateUpdateCategoryRequestDto,
  // ): Promise<CategoryResponseDto> {
  //   return this.productService.update(categoryId, updateCategoryRequestDto);
  // }

  // @ApiOperation({ description: 'remove category' })
  // @Delete('/:id')
  // async removeCategory(@UUIDParam('id') categoryId: Uuid): Promise<boolean> {
  //   return this.productService.softDelete(categoryId);
  // }

  // @ApiOperation({ description: 'restore category deleted' })
  // @Put('/:id/restore')
  // async restoredCategory(@UUIDParam('id') categoryId: Uuid): Promise<boolean> {
  //   return this.productService.restoreDeleted(categoryId);
  // }
}

// Cái trải nghiệm là cái không bao giờ có thể rút ngắn được.
// Dù em có trưởng thành đến đâu thì em cũng phải cần sự trải nghiệm
// trong cuộc sống của em để em có cái được gọi là trải nghiệm
