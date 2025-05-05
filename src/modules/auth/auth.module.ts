import { forwardRef, Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { GoogleController } from './controllers/google.controller';
import { UsersModule } from '../users/users.module';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  JWTAccessTokenAgeKey,
  JWTAccessTokenSecretKey,
} from 'src/common/constance';
import { PassportModule } from '@nestjs/passport';
import { GoogleInteractor } from './interactors/google.interactor';
import { JwtUtilService } from './services/jwt.service';

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
  providers: [GoogleInteractor, JwtUtilService],
  controllers: [GoogleController],
})
export class AuthModule {}
