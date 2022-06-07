import { EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm';

export class UserSubscriber implements EntitySubscriberInterface {
  listenTo(): string {
    return '';
  }

  beforeInsert(event: InsertEvent<any>): void | Promise<any> {
    console.log('beforeInsert====>', event);
    if (event.entity.password) {
      event.entity.password = '';
    }
  }

  beforeUpdate(event: UpdateEvent<any>): void | Promise<any> {
    console.log('beforeUpdate====>', event);
    const entity = event.entity;

    if (entity.password !== event.databaseEntity.password) {
      entity.password = '';
    }
  }
}
