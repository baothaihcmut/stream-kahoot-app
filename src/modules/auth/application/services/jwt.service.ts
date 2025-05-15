import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as LibJwtService } from '@nestjs/jwt';
import {
  JWTAccessTokenAgeKey,
  JWTAccessTokenSecretKey,
  JWTRefreshTokenAgeKey,
  JWTRefreshTokenSecretKey,
} from 'src/common/constance';
import { AccessTokenPayload } from '../models/access_token_payload.model';
import { RefreshTokenPayload } from '../models/refresh_token_payload.model';

@Injectable()
export class JwtUtilService {
  constructor(
    private jwtService: LibJwtService,
    private configService: ConfigService,
  ) {}

  async generateAccessToken(payload: AccessTokenPayload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>(JWTAccessTokenSecretKey),
      expiresIn: `${this.configService.get<number>(JWTAccessTokenAgeKey)}h`,
    });
  }

  async generateRefreshToken(payload: RefreshTokenPayload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>(JWTRefreshTokenSecretKey),
      expiresIn: `${this.configService.get<number>(JWTRefreshTokenAgeKey)}h`,
    });
  }

  async verifyAccessToken(token: string): Promise<AccessTokenPayload> {
    try {
      const payload = await this.jwtService.verifyAsync<AccessTokenPayload>(
        token,
        {
          secret: this.configService.get<string>(JWTAccessTokenSecretKey),
        },
      );
      return payload;
    } catch (err) {
      console.log(err);
      throw new HttpException('invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
  async verifyRefreshToken(token: string): Promise<RefreshTokenPayload> {
    try {
      const payload = await this.jwtService.verifyAsync<RefreshTokenPayload>(
        token,
        {
          secret: this.configService.get<string>(JWTRefreshTokenSecretKey),
        },
      );
      return payload;
    } catch (err) {
      throw new HttpException('invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
