import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  async get(key): Promise<any> {
    return await this.cache.get(key);
  }

  async set(key, value, opts = { ttl: 60 }) {
    await this.cache.set(key, value, opts);
  }

  async del(key) {
    await this.cache.del(key);
  }

  async reset() {
    await this.cache.reset();
  }
}
