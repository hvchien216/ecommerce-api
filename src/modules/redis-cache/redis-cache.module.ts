import { ApiConfigService } from '@/shared/services/api-config.service';
import { CacheModule, Module } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ApiConfigService],
      inject: [ApiConfigService],
      useFactory: async (configService: ApiConfigService) => ({
        store: redisStore,
        host: configService.redisConfig.redisHost,
        port: configService.redisConfig.redisPort,
      }),
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
