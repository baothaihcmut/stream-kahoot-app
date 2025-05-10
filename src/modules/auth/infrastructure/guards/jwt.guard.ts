import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
  handleRequest(err: any, user: any): any {
    if (err || !user) {
      throw new HttpException('token is required', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
