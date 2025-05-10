import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWTAccessTokenSecretKey } from 'src/common/constance';
import { Request } from 'express';
import { AccessTokenPayload } from '../../application/models/access_token_payload.model';

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
