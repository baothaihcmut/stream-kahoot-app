import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ResponseMessage,
  ResponseStatus,
} from 'src/common/decorators/response.decorator';
import { GoogleInteractor } from '../interactors/google.interactor';
import { GoogleOAuthGuard } from '../guards/google_auth.guard';
import { Response } from 'express';

@Controller('google')
export class GoogleController {
  constructor(private readonly googleInteractor: GoogleInteractor) {}

  @Post('/exchange')
  @ResponseStatus(HttpStatus.CREATED)
  @ResponseMessage('exchange token success')
  @UseGuards(GoogleOAuthGuard)
  async exchangeToken(@Res() res: Response): Promise<null> {
    const result = await this.googleInteractor.exchangeToken();
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
    return null;
  }
}
