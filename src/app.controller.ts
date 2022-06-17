import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    // const anubis = await this.cacheManager.get('anubis');
    // console.log('anubisss===>', anubis, typeof anubis);
    // await this.cacheManager.set(
    //   'anubis',
    //   { user: { name: 'chien', age: 18 } },
    //   { ttl: 5 },
    // );
    // await this.cacheManager.set('AAA', 1, { ttl: 5 });

    return this.appService.getHello();
  }
}
