import { HttpService } from '@nestjs/axios';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { USER_GOOGLE_CONTEXT, UserGoogle } from '../models/user_google.model';
import { ContextService } from 'src/common/context/context.service';

@Injectable()
export class GoogleOAuthGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    private readonly contextService: ContextService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const { authCode } = req.body;
    if (!authCode) {
      throw new HttpException('auth code is required', HttpStatus.UNAUTHORIZED);
    }
    const tokenUrl = 'https://oauth2.googleapis.com/token';
    const params = new URLSearchParams();
    params.append('code', authCode);
    params.append('client_id', process.env.GOOGLE_CLIENT_ID);
    params.append('client_secret', process.env.GOOGLE_CLIENT_SECRET);
    params.append('redirect_uri', process.env.GOOGLE_CALLBACK_URL);
    params.append('grant_type', 'authorization_code');
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
      firstName: userData['family_name'] || '',
      lastName: userData['given_name'] || '',
      email: userData['email'],
      picture: userData['picture'],
    };
    this.contextService.set(USER_GOOGLE_CONTEXT, userContext);
    return true;
  }
}
