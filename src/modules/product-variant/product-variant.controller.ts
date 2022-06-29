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
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryResponseDto } from '../category/dtos';
import { ProductVariantService } from './product-variant.service';

@ApiTags('Product variant')
@Controller('product-variants')
export class ProductVariantController {
  constructor(private productVariantsService: ProductVariantService) {}
}
