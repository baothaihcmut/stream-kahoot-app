import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ResponseMessage,
  ResponseStatus,
} from 'src/common/decorators/response.decorator';
import { GoogleLoginOutput } from '../presenters/google_login.presenter';
import { GoogleInteractor } from '../interactors/google.interactor';
import { GoogleOAuthGuard } from '../guards/google_auth.guard';

@Controller('google')
export class GoogleController {
  constructor(private readonly googleInteractor: GoogleInteractor) {}

  @Post('/exchange')
  @ResponseStatus(HttpStatus.CREATED)
  @ResponseMessage('exchange token success')
  @UseGuards(GoogleOAuthGuard)
  async exchangeToken(): Promise<GoogleLoginOutput> {
    return await this.googleInteractor.exchangeToken();
  }
}
