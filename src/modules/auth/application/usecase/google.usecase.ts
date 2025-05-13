import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ContextService } from 'src/common/context/context.service';

import { User } from 'src/modules/users/domain/entities/user';
import { Role } from 'src/common/enums/role.enum';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import {
  GOOGLE_OAUTH_CLIENT_ID_CONFIG_KEY,
  GOOGLE_OAUTH_SECRET_CONFIG_KEY,
  GOOGLE_OAUTH_CALLBACK_URL,
} from 'src/common/constance';
import { HttpService } from '@nestjs/axios';
import { JwtUtilService } from '../services/jwt.service';
import {
  GoogleExchangeTokenInput,
  GoogleExchangeTokenOutput,
} from '../presenters/google_login.presenter';
import { UserGoogle } from '../models/user_google.model';
import { USER_PRISMA_REPO } from 'src/modules/users/infrastructure/prisma/user.prisma';
import { UserRepository } from 'src/modules/users/domain/repositories/user.repository';

@Injectable()
export class GoogleUseCase {
  constructor(
    @Inject(USER_PRISMA_REPO) private readonly userRepo: UserRepository,
    private readonly jwtService: JwtUtilService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  private async getUserInfo(authCode: string): Promise<UserGoogle> {
    const tokenUrl = 'https://oauth2.googleapis.com/token';
    const params = new URLSearchParams({
      code: authCode,
      client_id: this.configService.get<string>(
        GOOGLE_OAUTH_CLIENT_ID_CONFIG_KEY,
      ),
      client_secret: this.configService.get<string>(
        GOOGLE_OAUTH_SECRET_CONFIG_KEY,
      ),
      redirect_uri: this.configService.get<string>(GOOGLE_OAUTH_CALLBACK_URL),
      grant_type: 'authorization_code',
    });

    const resp = await firstValueFrom(this.httpService.post(tokenUrl, params));
    if (resp.status != HttpStatus.OK) {
      throw new HttpException('auth code not valid', HttpStatus.UNAUTHORIZED);
    }
    //get user info
    const userInfoUrl = 'https://www.googleapis.com/oauth2/v3/userinfo';
    const accessToken = resp.data['access_token'];
    const userInfo = await firstValueFrom(
      this.httpService.get(userInfoUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    );
    const userData = userInfo.data;
    const userContext: UserGoogle = {
      firstName: userData['family_name'] ?? '',
      lastName: userData['given_name'] ?? '',
      email: userData['email'],
      picture: userData['picture'],
    };
    return userContext;
  }

  async exchangeToken(
    input: GoogleExchangeTokenInput,
  ): Promise<GoogleExchangeTokenOutput> {
    const userGoogleContext: UserGoogle = await this.getUserInfo(
      input.authCode,
    );
    let user: User = await this.userRepo.findUserByEmail(
      userGoogleContext.email,
    );
    if (!user) {
      user = User.newUser(
        userGoogleContext.email,
        userGoogleContext.firstName,
        userGoogleContext.lastName,
        userGoogleContext.picture,
      );
      await this.userRepo.createUser(user);
    }
    const [accessToken, refreshToken] = await Promise.all([
      await this.jwtService.generateAccessToken({
        userId: user.id,
        role: Role.USER,
      }),
      await this.jwtService.generateRefreshToken({
        userId: user.id,
      }),
    ]);
    user.updateRefreshToken(refreshToken);
    //update refresh token
    await this.userRepo.updateUser(user);
    console.log(await this.jwtService.verifyAccessToken(accessToken));
    console.log(accessToken);
    return new GoogleExchangeTokenOutput(accessToken, refreshToken);
  }
}
