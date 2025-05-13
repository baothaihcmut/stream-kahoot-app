import { Request } from 'express';
import { AccessTokenPayload } from 'src/auth/models/access_token_payload.model';

declare module 'express' {
  export interface Request {
    user?: AccessTokenPayload;
  }
}
