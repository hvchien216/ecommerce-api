import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import morgan from 'morgan';
import { AppModule } from './app.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('process===>', process.env.NODE_ENV, '----', process.env.PORT);
  const configService = app.select(SharedModule).get(ApiConfigService);

  app.use(helmet());
  // app.setGlobalPrefix('/api'); use api as global prefix if you don't have subdomain
  // app.use(
  //   rateLimit({
  //     windowMs: 15 * 60 * 1000, // 15 minutes
  //     max: 100, // limit each IP to 100 requests per windowMs
  //   }),
  // );
  // app.use(compression());
  app.use(morgan('combined'));
  app.enableVersioning();

  await app.listen(configService.appConfig.port);
  console.info(`server running on ${await app.getUrl()}`);
}
bootstrap();
