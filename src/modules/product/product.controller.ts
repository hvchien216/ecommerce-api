import { UUIDParam } from '@/decorators/http.decorators';
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
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateProductVariantsRequestDto } from '../product-variant/dtos';
import {
  CreateProductRequestDto,
  ProductResponseDto,
  QueryProductsRequestDto,
} from './dtos';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiOperation({ description: 'Get a paginated product no variant list' })
  @Get()
  async getProducts(
    @PaginationParams()
    pagination: PaginationRequest<QueryProductsRequestDto>,
    // @Query(new ValidationPipe({ transform: true }))
    // ids: QueryProductsRequestDto,
  ): Promise<PaginationResponseDto<ProductResponseDto>> {
    return this.productService.getList(pagination);
  }

  @ApiOperation({ description: 'get models of product' })
  @Get('/:id')
  async getProduct(
    @UUIDParam('id')
    productId: Uuid,
  ): Promise<ProductResponseDto> {
    return this.productService.getProduct(productId);
  }

  @ApiOperation({ description: 'create product' })
  @Post()
  async create(
    @Body(ValidationPipe)
    createCategoryRequestDto: CreateProductRequestDto,
  ): Promise<ProductResponseDto> {
    return this.productService.create(createCategoryRequestDto);
  }

  @ApiOperation({ description: 'update price & quantity of models' })
  @Put('/:id/models')
  async updateInventory(
    @UUIDParam('id')
    productId: Uuid,
    @Body(ValidationPipe)
    data: { models: UpdateProductVariantsRequestDto[] },
  ): Promise<ProductResponseDto> {
    return this.productService.updateInventory(productId, data);
  }
}
