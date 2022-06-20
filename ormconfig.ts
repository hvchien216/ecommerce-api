import './src/boilerplate.polyfill';
import { UserSubscriber } from './src/entity-subscribers/user-subscriber';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const configs: TypeOrmModuleOptions & {
  seeds?: string[];
  factories?: string[];
} = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_DATABASE,
  subscribers: [UserSubscriber],
  entities: [
    'src/modules/**/*.entity{.ts,.js}',
    'src/modules/**/*.view-entity{.ts,.js}',
  ],
  migrations: ['src/database/migrations/*{.ts,.js}'],
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  factories: ['src/database/factories/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

// export const dataSource = new DataSource(configs);
module.exports = configs;
