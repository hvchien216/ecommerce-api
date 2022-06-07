import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('process===>', process.env.NODE_ENV, '----', process.env.PORT);
  const configService = app.select(SharedModule).get(ApiConfigService);

  await app.listen(3000);
  console.info(`server running on ${await app.getUrl()}`);
}
bootstrap();
