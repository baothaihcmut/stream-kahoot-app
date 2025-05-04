import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ContextService,
  USER_CONTEXT_KEY,
} from 'src/common/context/context.service';
import { UserContext } from 'src/common/context/user.context';
import { AccessTokenPayload } from '../services/jwt.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly contextService: ContextService) {
    super();
  }
  handleRequest(err: any, user: any): any {
    if (err || !user) {
      throw new HttpException('token is required', HttpStatus.UNAUTHORIZED);
    }
    const payload = user as AccessTokenPayload;
    const userContext: UserContext = {
      userId: payload.userId,
      role: payload.role,
    };
    this.contextService.set(USER_CONTEXT_KEY, userContext);
    return user;
  }
}
