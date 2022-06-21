import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { CategoryMapper } from './category.mapper';
import { CategoryResponseDto, CreateUpdateCategoryRequestDto } from './dtos';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getCategories(): Promise<CategoryResponseDto[]> {
    const categoriesEntity = await this.categoryRepository.find();

    return await Promise.all(
      (await categoriesEntity).map(CategoryMapper.toDto),
    );
  }

  async create(
    createCategoryDto: CreateUpdateCategoryRequestDto,
  ): Promise<CategoryResponseDto> {
    let categoryEntity = CategoryMapper.toCreateEntity(createCategoryDto);

    categoryEntity = await this.categoryRepository.save(categoryEntity);

    return CategoryMapper.toDto(categoryEntity);
  }

  async update(
    category_id: Uuid,
    updateCategoryDto: CreateUpdateCategoryRequestDto,
  ): Promise<CategoryResponseDto> {
    let categoryEntity = await this.categoryRepository.findOne(category_id);

    if (!categoryEntity) {
      throw new NotFoundException();
    }

    categoryEntity = CategoryMapper.toUpdateEntity(
      categoryEntity,
      updateCategoryDto,
    );

    categoryEntity = await this.categoryRepository.save(categoryEntity);

    return CategoryMapper.toDto(categoryEntity);
  }

  async softDelete(category_id: Uuid): Promise<boolean> {
    await this.categoryRepository.softDelete({
      id: category_id,
    });

    return true;
  }
}
