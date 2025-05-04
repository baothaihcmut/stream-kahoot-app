import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWTAccessTokenSecretKey } from 'src/common/constance';
import { AccessTokenPayload } from '../services/jwt.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: (req: Request): string | null => {
        return req?.cookies['access_token'] ?? null;
      },
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(JWTAccessTokenSecretKey),
    });
  }

  async validate(payload: any): Promise<AccessTokenPayload> {
    return { userId: payload.userId, role: payload.role };
  }
}
