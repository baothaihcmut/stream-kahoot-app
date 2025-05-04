import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as LibJwtService } from '@nestjs/jwt';
import { UUID } from 'crypto';
import {
  JWTAccessTokenSecretKey,
  JWTRefreshTokenAgeKey,
  JWTRefreshTokenSecretKey,
} from 'src/common/constance';
import { Role } from 'src/common/enums/role.enum';

export interface AccessTokenPayload {
  userId: UUID;
  role: Role;
}

export interface RefreshTokenPayload {
  userId: UUID;
}
@Injectable()
export class JwtUtilService {
  constructor(
    private jwtService: LibJwtService,
    private configService: ConfigService,
  ) {}

  async generateAccessToken(payload: AccessTokenPayload): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }

  async generateRefreshToken(payload: RefreshTokenPayload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>(JWTAccessTokenSecretKey),
      expiresIn: `${this.configService.get<number>(JWTRefreshTokenAgeKey)}h`,
    });
  }
}
