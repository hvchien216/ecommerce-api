import { Helpers } from '@/utils/helpers';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { StoreController } from './store.controller';
import { StoreEntity } from './store.entity';
import { StoreService } from './store.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoreEntity]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [StoreController],
  providers: [StoreService, Helpers],
})
export class StoreModule {}

// const infoProduct: any = {};

// const products = [
//   {
//     id: 'uuid',
//     name: 'Widget 1',
//     ...infoProduct,
//     variants: [
//       { size: 'small', color: 'red', price: 1000, qty: 5 },
//       { size: 'small', color: 'blue', price: 1000, qty: 5 },
//       { size: 'small', color: 'yellow', price: 1000, qty: 5 },
//       { size: 'medium', color: 'red', price: 1000, qty: 5 },
//       { size: 'medium', color: 'blue', price: 1000, qty: 5 },
//       { size: 'medium', color: 'yellow', price: 1000, qty: 5 },
//     ],
//   },
//   {
//     id: 'uuid',
//     name: 'Widget 2',
//     ...infoProduct,
//     variants: [
//       { size: 'small', color: 'red', price: 1000, qty: 5 },
//       { size: 'small', color: 'blue', price: 1000, qty: 5 },
//       { size: 'small', color: 'yellow', price: 1000, qty: 5 },
//       { size: 'medium', color: 'red', price: 1000, qty: 5 },
//       { size: 'medium', color: 'blue', price: 1000, qty: 5 },
//       { size: 'medium', color: 'yellow', price: 1000, qty: 5 },
//     ],
//   },
// ];
