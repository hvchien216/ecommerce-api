import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import axios from 'axios';
import { ProvinceEntity } from '@/modules/address/province.entity';
import { DistrictEntity } from '@/modules/address/district.entity';
import { WardEntity } from '@/modules/address/ward.entity';
export class InitAdministrativeSeed implements Seeder {
  async run(_: Factory, connection: Connection): Promise<any> {
    const baseUrl =
      'https://raw.githubusercontent.com/madnh/hanhchinhvn/master/dist/';

    const paths = ['tinh_tp.json', 'quan_huyen.json', 'xa_phuong.json'];

    async function getData(path) {
      try {
        const response = await axios.get(
          `https://raw.githubusercontent.com/madnh/hanhchinhvn/master/dist/${path}`,
        );
        // console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }

    const [provinces, districts, wards] = await Promise.all<any>(
      paths.map((path) => getData(path)),
    );

    console.log(
      Object.keys(provinces).length,
      Object.keys(districts).length,
      Object.keys(wards).length,
    );
    const data = Object.values(provinces).map((p: any) => {
      let districtsOfProvince = Object.values(districts).filter(
        (d: any) => d.parent_code === p.code,
      );

      districtsOfProvince = districtsOfProvince.map((d: any) => {
        const wardsOfDistrict = Object.values(wards).filter(
          (w: any) => w.parent_code === d.code,
        );
        return {
          ...d,
          wards: wardsOfDistrict,
        };
      });
      return {
        ...p,
        districts: districtsOfProvince,
      };
    });
    console.log((data[0] as any).districts[0].wards);

    for (const province of data) {
      let provinceEntity = new ProvinceEntity({
        name: (province as any).name,
      });

      provinceEntity = await connection.manager.save(provinceEntity);

      for (const district of (province as any).districts) {
        let districtEntity = new DistrictEntity({
          province_id: provinceEntity.id,
          name: district.name,
        });

        districtEntity = await connection.manager.save(districtEntity);

        const wardEntities = await Promise.all(
          (district as any).wards.map((w: any) => {
            const wardEntity = new WardEntity({
              district_id: districtEntity.id,
              name: w.name,
            });
            return wardEntity;
          }),
        );

        await connection.manager.save(wardEntities);
        // for (const ward of (district as any).wards) {
        //   let wardEntity = new WardEntity({
        //     district_id: districtEntity.id,
        //     name: ward.name,
        //   });

        //   wardEntity = await connection.manager.save(wardEntity);
        // }
      }
    }

    // const createCategory = async (category, parent_id = null) => {
    //   let categoryEntity = new CategoryEntity();
    //   categoryEntity.title = category.display_name;
    //   categoryEntity.description = category.name;
    //   categoryEntity.parent_id = parent_id;

    //   categoryEntity = await connection.manager.save(categoryEntity);

    //   if (category.children) {
    //     for (const cat of category.children) {
    //       await createCategory(cat, categoryEntity.id || null);
    //     }
    //   }
    // };
    // for (const parentCat of categories) {
    //   await createCategory(parentCat);
    // }
  }
}
//https://raw.githubusercontent.com/madnh/hanhchinhvn/master/dist/tinh_tp.json
//https://raw.githubusercontent.com/madnh/hanhchinhvn/master/dist/quan_huyen.json
//https://raw.githubusercontent.com/madnh/hanhchinhvn/master/dist/xa_phuong.json
