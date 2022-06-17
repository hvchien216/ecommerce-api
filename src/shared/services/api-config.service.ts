import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { isNil } from 'lodash';

import { UserSubscriber } from '../../entity-subscribers/user-subscriber';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }

  private getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + ' environment variable is not a number');
    }
  }

  private getBoolean(key: string): boolean {
    const value = this.get(key);

    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(key + ' env var is not a boolean');
    }
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.replace(/\\n/g, '\n');
  }

  get nodeEnv(): string {
    return this.getString('NODE_ENV');
  }

  get postgresConfig(): TypeOrmModuleOptions {
    const entities = [
      __dirname + '/../../modules/**/*.entity{.ts,.js}',
      __dirname + '/../../modules/**/*.view-entity{.ts,.js}',
    ];
    const migrations = [__dirname + '/../../database/migrations/*{.ts,.js}'];

    // if (module.hot) {
    //   const entityContext = require.context(
    //     './../../modules',
    //     true,
    //     /\.entity\.ts$/,
    //   );
    //   entities = entityContext.keys().map((id) => {
    //     const entityModule = entityContext<Record<string, unknown>>(id);
    //     const [entity] = Object.values(entityModule);

    //     return entity as string;
    //   });
    //   const migrationContext = require.context(
    //     './../../database/migrations',
    //     false,
    //     /\.ts$/,
    //   );

    //   migrations = migrationContext.keys().map((id) => {
    //     const migrationModule = migrationContext<Record<string, unknown>>(id);
    //     const [migration] = Object.values(migrationModule);

    //     return migration as string;
    //   });
    // }

    return {
      entities,
      migrations,
      // keepConnectionAlive: !this.isTesst,
      dropSchema: this.isTest,
      // synchronize: true,
      type: 'postgres',
      name: 'default',
      host: this.getString('DB_HOST'),
      port: this.getNumber('DB_PORT'),
      username: this.getString('DB_USERNAME'),
      password: this.getString('DB_PASSWORD'),
      database: this.getString('DB_DATABASE'),
      subscribers: [UserSubscriber],
      // migrationsRun: true,
      logging: this.getBoolean('ENABLE_ORM_LOGS'),
    };
  }

  get redisConfig() {
    return {
      redisCacheEnabled: this.getString('REDIS_CACHE_ENABLED'),
      redisHost: this.getString('REDIS_HOST'),
      redisPort: this.getString('REDIS_PORT'),
    };
  }

  get awsS3Config() {
    return {
      bucketRegion: this.getString('AWS_S3_BUCKET_REGION'),
      bucketApiVersion: this.getString('AWS_S3_API_VERSION'),
      bucketName: this.getString('AWS_S3_BUCKET_NAME'),
    };
  }

  get documentationEnabled(): boolean {
    return this.getBoolean('ENABLE_DOCUMENTATION');
  }

  get authConfig() {
    return {
      privateKey: this.getString('JWT_PRIVATE_KEY'),
      publicKey: this.getString('JWT_PUBLIC_KEY'),
      refreshTokenExpirationTime: this.getString(
        'REFRESH_TOKEN_EXPIRATION_TIME',
      ),
      accessTokenExpirationTime: this.getString('ACCESS_TOKEN_EXPIRATION_TIME'),
    };
  }

  get appConfig() {
    return {
      port: this.getString('PORT'),
      enableDocumentation: this.getString('ENABLE_DOCUMENTATION'),
      apiVersion: this.getString('API_VERSION'),
    };
  }

  private get(key: string): string {
    const value = this.configService.get<string>(key);

    if (isNil(value)) {
      throw new Error(key + ' environment variable does not set'); // probably we should call process.exit() too to avoid locking the service
    }

    return value;
  }
}
