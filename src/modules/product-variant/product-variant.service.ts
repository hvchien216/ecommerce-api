// https://github.com/nestjs/typeorm/issues/14
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttributeItemEntity } from '../attribute-item/attribute-item.entity';
import { AttributeEntity } from '../attribute/attribute.entity';
import { CategoryEntity } from '../category/category.entity';
import { StoreEntity } from '../store/store.entity';
import { ProductVariantEntity } from './product-variant.entity';

@Injectable()
export class ProductVariantService {
  constructor(
    @InjectRepository(ProductVariantEntity)
    private productRepository: Repository<ProductVariantEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(StoreEntity)
    private storeRepository: Repository<StoreEntity>,
  ) {}

  generateModels(
    attributeItemEntities: AttributeEntity[],
  ): { name: string; entities: AttributeItemEntity[] }[] {
    const optionsGroup = attributeItemEntities.map((attb) => {
      const group = attb.attribute_items.map((attbItem) => {
        return {
          name: `${attbItem.value}`,
          entities: [attbItem],
        };
      });
      return group;
    });
    const productVariantEntities = optionsGroup.reduce((acc, current) => {
      if (acc.length > 0) {
        return acc.flatMap((l) =>
          current.map((r) => ({
            name: `${l.name},${r.name}`,
            entities: [l.entities[0], r.entities[0]],
          })),
        );
      }
      return current;
    }, []);
    return productVariantEntities;
  }
}
