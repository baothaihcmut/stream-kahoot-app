import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JwtUtilService } from '../../application/services/jwt.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtUtilService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const token = req.cookies['access_token'];
    if (!token) {
      throw new HttpException('token required', HttpStatus.UNAUTHORIZED);
    }
    const tokenPayload = await this.jwtService.verifyAccessToken(token);
    req.user = tokenPayload;
    return true;
  }
}
