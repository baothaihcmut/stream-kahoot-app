import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ResponseMessage,
  ResponseStatus,
} from 'src/common/decorators/response.decorator';
import { GoogleInteractor } from '../interactors/google.interactor';
import { Response } from 'express';
import { GoogleExchangeTokenInput } from '../presenters/google_login.presenter';
@Controller('google')
export class GoogleController {
  constructor(private readonly googleInteractor: GoogleInteractor) {}

  @Post('/exchange')
  @ResponseStatus(HttpStatus.CREATED)
  @ResponseMessage('exchange token success')
  async exchangeToken(
    @Query() input: GoogleExchangeTokenInput,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{}> {
    const result = await this.googleInteractor.exchangeToken(input);
    res.cookie('access_token', result.accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
      domain: '.spsohcmut.xyz',
    });
    res.cookie('refresh_token', result.refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 3,
      domain: '.spsohcmut.xyz',
    });
    return {};
  }

  @Get('/log-in')
  async googleLogin(@Res() res: Response) {
    const loginUrl =
      'https://accounts.google.com/o/oauth2/auth?client_id=389043346779-q89gjc1tlu66lavd6r2toldoc5vrjbim.apps.googleusercontent.com&redirect_uri=http://localhost:3000/google/redirect&response_type=code&scope=email profile&access_type=offline&prompt=consent';
    res.redirect(loginUrl);
  }
}
