import { UUID } from 'crypto';
import { Role } from '../enums/role.enum';

export interface UserContext {
  userId: UUID;
  role: Role;
}
