import { GenderType } from '@/constants/gener-type';
import { RoleType } from '@/constants/role-type';
import { StoreMapper } from '@/modules/store/store.mapper';
import { UserMapper } from '@/modules/user/user.mapper';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

const users = [
  {
    username: 'hvchien216@gmail.com',
    password: '123456',
    role: RoleType.ADMIN,
    name: 'Kim Jisoo',
    profile: {
      gender: GenderType.FEMALE,
      phone: '0703239783',
      avatar: null,
      email: 'hvchien216@gmail.com',
      address: '233/44 Ho Chi Minh City, VietNam',
    },
  },
];

const stores = [
  {
    name: 'Adidas Official Store',
    bio: 'Thịt Đại Bàng hàng real',
    slug: 'adidas-official-store',
  },
];

export class InitialDatabaseSeed implements Seeder {
  async run(_: Factory, connection: Connection): Promise<any> {
    const userEntities = await Promise.all(
      users.map(async (u) => {
        const user = UserMapper.toCreateEntity(u);
        return user;
      }),
    );
    const savedUsers = await connection.manager.save(userEntities);

    const storeEntities = await Promise.all(
      stores.map(async (s, idx) => {
        const storeEntity = StoreMapper.toCreateEntity(s);
        storeEntity.employees = [savedUsers[idx]];
        return storeEntity;
      }),
    );

    await connection.manager.save(storeEntities);
  }
}
