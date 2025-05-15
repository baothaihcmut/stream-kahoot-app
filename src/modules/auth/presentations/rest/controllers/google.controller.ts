import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ResponseMessage,
  ResponseStatus,
} from 'src/common/decorators/response.decorator';
import { Request, Response } from 'express';
import { GoogleUseCase } from 'src/modules/auth/application/usecase/google.usecase';

import { ValidateInputPipe } from 'src/common/pipes/validate.pipe';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt.guard';
import { ConfigService } from '@nestjs/config';
import { GoogleExchangeTokenInput } from 'src/modules/auth/application/presenters/google_login.presenter';
import { ApiQuery } from '@nestjs/swagger';

@Controller('google')
export class GoogleController {
  constructor(
    private readonly googleInteractor: GoogleUseCase,
    private readonly configService: ConfigService,
  ) {}

  @Post('/exchange')
  @ResponseStatus(HttpStatus.CREATED)
  @ResponseMessage('exchange token success')
  @UsePipes(ValidateInputPipe)
  @ApiQuery({ name: 'auth_code', type: String })
  async exchangeToken(
    @Query('auth_code') authCode: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.googleInteractor.exchangeToken(
      new GoogleExchangeTokenInput(authCode),
    );
    res.cookie('access_token', result.accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
      domain: 'localhost',
    });
    res.cookie('refresh_token', result.refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 3,
      domain: 'localhost',
    });
  }

  @Get('/log-in')
  async googleLogin(@Res() res: Response) {
    const loginUrl =
      'https://accounts.google.com/o/oauth2/auth?client_id=389043346779-q89gjc1tlu66lavd6r2toldoc5vrjbim.apps.googleusercontent.com&redirect_uri=http://localhost:3000/google/redirect&response_type=code&scope=email profile&access_type=offline&prompt=consent';
    res.redirect(loginUrl);
  }

  @Get('/test')
  @ResponseStatus(HttpStatus.CREATED)
  @ResponseMessage('exchange token success')
  @UseGuards(JwtAuthGuard)
  async test(@Req() req: Request) {
    return { token: req.cookies['access_token'] };
  }
}
