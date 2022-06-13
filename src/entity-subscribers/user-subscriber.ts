import { generateHash } from '../common/utils';
import { UserEntity } from '../modules/user/user.entity';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface {
  listenTo(): typeof UserEntity {
    return UserEntity;
  }

  async beforeInsert(event: InsertEvent<UserEntity>): Promise<void> {
    console.log('beforeInsert====>', event);
    if (event.entity.password) {
      event.entity.password = await generateHash(event.entity.password);
    }
  }

  async beforeUpdate(event: UpdateEvent<UserEntity>): Promise<void> {
    console.log('beforeUpdate====>', event);
    const entity = event.entity as UserEntity;

    if (entity.password !== event.databaseEntity.password) {
      entity.password = await generateHash(entity.password);
    }
  }
}
