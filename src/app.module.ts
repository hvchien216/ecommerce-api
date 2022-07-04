import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiConfigService } from './shared/services/api-config.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ProductModule } from './modules/product/product.module';
import { ProductVariantModule } from './modules/product-variant/product-variant.module';
import { StoreModule } from './modules/store/store.module';
import { CategoryModule } from './modules/category/category.module';
import { UploadModule } from './modules/upload/upload.module';
import { AttributeModule } from './modules/attribute/attribute.module';
import { AttributeItemModule } from './modules/attribute-item/attribute-item.module';
import { OrderModule } from './modules/order/order.module';
// import { PaymentModule } from './modules/payment/payment.module';
import { CartModule } from './modules/cart/cart.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (apiConfigService: ApiConfigService) =>
        apiConfigService.postgresConfig,
      inject: [ApiConfigService],
    }),
    UserModule,
    AuthModule,
    ProfileModule,
    ProductModule,
    ProductVariantModule,
    StoreModule,
    CategoryModule,
    UploadModule,
    AttributeModule,
    AttributeItemModule,
    OrderModule,
    CartModule,
    // PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
