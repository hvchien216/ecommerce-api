import { CategoryEntity } from '@/modules/category/category.entity';
import { categories } from '@/modules/category/data-seed';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class InitCategoriesSeed implements Seeder {
  async run(_: Factory, connection: Connection): Promise<any> {
    const createCategory = async (category, parent_id = null) => {
      let categoryEntity = new CategoryEntity();
      categoryEntity.title = category.display_name;
      categoryEntity.description = category.name;
      categoryEntity.parent_id = parent_id;

      categoryEntity = await connection.manager.save(categoryEntity);

      if (category.children) {
        for (const cat of category.children) {
          await createCategory(cat, categoryEntity.id || null);
        }
      }
    };
    for (const parentCat of categories) {
      await createCategory(parentCat);
    }
  }
}
