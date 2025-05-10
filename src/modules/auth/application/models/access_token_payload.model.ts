import { UUID } from 'crypto';
import { Role } from 'src/common/enums/role.enum';

export interface AccessTokenPayload {
  userId: UUID;
  role: Role;
}
