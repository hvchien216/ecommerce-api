import { UUIDParam } from '@/decorators/http.decorators';
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
import { CategoryService } from './category.service';
import { CategoryResponseDto, CreateUpdateCategoryRequestDto } from './dtos';

@ApiTags('Category')
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiOperation({ description: 'Get a paginated store list' })
  @Get()
  async getStores(): Promise<CategoryResponseDto[]> {
    return this.categoryService.getCategories();
  }

  @ApiOperation({ description: 'create category' })
  @Post()
  async createCategory(
    @Body(ValidationPipe)
    createCategoryRequestDto: CreateUpdateCategoryRequestDto,
  ): Promise<CategoryResponseDto> {
    return this.categoryService.create(createCategoryRequestDto);
  }

  @ApiOperation({ description: 'update category' })
  @Put('/:id')
  async updateCategory(
    @UUIDParam('id') categoryId: Uuid,
    updateCategoryRequestDto: CreateUpdateCategoryRequestDto,
  ): Promise<CategoryResponseDto> {
    return this.categoryService.update(categoryId, updateCategoryRequestDto);
  }

  @ApiOperation({ description: 'remove category' })
  @Delete('/:id')
  async removeCategory(@UUIDParam('id') categoryId: Uuid): Promise<boolean> {
    return this.categoryService.softDelete(categoryId);
  }
}
