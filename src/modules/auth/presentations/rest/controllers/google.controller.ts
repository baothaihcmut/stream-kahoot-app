import { Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common';
import {
  ResponseMessage,
  ResponseStatus,
} from 'src/common/decorators/response.decorator';
import { Response } from 'express';
import { GoogleUseCase } from 'src/modules/auth/application/usecase/google.usecase';
import {
  ExchangeTokenGoogleRequestDTO,
  ExchangeTokenGoogleResponseDTO,
} from '../dtos/exchange_token_google.dto';
import { GoogleRestMapper } from 'src/modules/auth/infrastructure/mappers/rest/google.mapper';

@Controller('google')
export class GoogleController {
  constructor(
    private readonly googleInteractor: GoogleUseCase,
    private readonly googleMapper: GoogleRestMapper,
  ) {}

  @Post('/exchange')
  @ResponseStatus(HttpStatus.CREATED)
  @ResponseMessage('exchange token success')
  async exchangeToken(
    @Query() input: ExchangeTokenGoogleRequestDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ExchangeTokenGoogleResponseDTO> {
    const result = await this.googleInteractor.exchangeToken(
      this.googleMapper.toExchangeGoogleTokenInput(input),
    );
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
    return new ExchangeTokenGoogleResponseDTO();
  }

  @Get('/log-in')
  async googleLogin(@Res() res: Response) {
    const loginUrl =
      'https://accounts.google.com/o/oauth2/auth?client_id=389043346779-q89gjc1tlu66lavd6r2toldoc5vrjbim.apps.googleusercontent.com&redirect_uri=http://localhost:3000/google/redirect&response_type=code&scope=email profile&access_type=offline&prompt=consent';
    res.redirect(loginUrl);
  }
}
