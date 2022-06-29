import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeItemController } from './attribute-item.controller';
import { AttributeItemEntity } from './attribute-item.entity';
import { AttributeItemService } from './attribute-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([AttributeItemEntity])],
  controllers: [AttributeItemController],
  providers: [AttributeItemService],
})
export class AttributeItemModule {}
