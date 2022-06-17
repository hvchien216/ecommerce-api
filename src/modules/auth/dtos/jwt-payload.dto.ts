import { RoleType } from '@/constants/role-type';
import { TokenType } from '@/constants/token-type';

export interface JwtPayload {
  userId: Uuid;
  role: RoleType;
  username: string;
  type: TokenType;
}
