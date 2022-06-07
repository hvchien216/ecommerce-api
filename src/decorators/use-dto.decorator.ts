import { Constructor } from 'src/common/type';
import type { AbstractEntity } from '../common/abstract.entity';
import type { AbstractDto } from '../common/dto/abstract.dto';

export function UseDto(
  dtoClass: Constructor<AbstractDto, [AbstractEntity, unknown]>,
): ClassDecorator {
  return (ctor) => {
    ctor.prototype.dtoClass = dtoClass;
  };
}
