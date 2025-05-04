import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { USER_GOOGLE_CONTEXT, UserGoogle } from '../models/user_google.model';
import { ConfigService } from '@nestjs/config';
import {
  GOOGLE_OAUTH_CALLBACK_URL,
  GOOGLE_OAUTH_CLIENT_ID_CONFIG_KEY,
  GOOGLE_OAUTH_SECRET_CONFIG_KEY,
} from 'src/common/constance';
import { ContextService } from 'src/common/context/context.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly contextService: ContextService,
  ) {
    super({
      clientID: configService.get<string>(GOOGLE_OAUTH_CLIENT_ID_CONFIG_KEY),
      clientSecret: configService.get<string>(GOOGLE_OAUTH_SECRET_CONFIG_KEY),
      callbackURL: configService.get<string>(GOOGLE_OAUTH_CALLBACK_URL),
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user: UserGoogle = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
      refreshToken,
    };
    this.contextService.set(USER_GOOGLE_CONTEXT, user);
    done(null, user);
  }
}
