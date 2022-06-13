import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class PublicStrategy extends PassportStrategy(Strategy, 'public') {
  constructor() {
    super();
  }

  authenticate(): void {
    return this.success({ [Symbol.for('isPublic')]: true });
  }
}
