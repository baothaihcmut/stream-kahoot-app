import { forwardRef, Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { UsersModule } from '../users/users.module';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  JWTAccessTokenAgeKey,
  JWTAccessTokenSecretKey,
} from 'src/common/constance';
import { PassportModule } from '@nestjs/passport';
import { JwtUtilService } from './application/services/jwt.service';
import { GoogleUseCase } from './application/usecase/google.usecase';
import { GoogleController } from './presentations/rest/controllers/google.controller';
import { GoogleRestMapper } from './infrastructure/mappers/rest/google.mapper';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(JWTAccessTokenSecretKey),
        signOptions: {
          expiresIn: `${configService.get<number>(JWTAccessTokenAgeKey)}h`,
        },
      }),
    }),
    PassportModule,
    forwardRef(() => CommonModule),
    UsersModule,
    HttpModule,
  ],
  providers: [GoogleUseCase, JwtUtilService, GoogleRestMapper],
  controllers: [GoogleController],
  exports: [JwtUtilService],
})
export class AuthModule {}
