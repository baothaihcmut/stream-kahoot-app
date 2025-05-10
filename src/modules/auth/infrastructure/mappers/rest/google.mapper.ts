import { createMap, createMapper } from '@automapper/core';
import { classes } from '@automapper/classes';
import { Injectable } from '@nestjs/common';
import { GoogleExchangeTokenInput } from 'src/modules/auth/application/presenters/google_login.presenter';
import { ExchangeTokenGoogleRequestDTO } from 'src/modules/auth/presentations/rest/dtos/exchange_token_google.dto';

export const googleMapper = createMapper({
  strategyInitializer: classes(),
});

@Injectable()
export class GoogleRestMapper {
  constructor() {
    createMap(
      googleMapper,
      ExchangeTokenGoogleRequestDTO,
      GoogleExchangeTokenInput,
    );
  }

  toExchangeGoogleTokenInput(
    dto: ExchangeTokenGoogleRequestDTO,
  ): GoogleExchangeTokenInput {
    return googleMapper.map(
      dto,
      ExchangeTokenGoogleRequestDTO,
      GoogleExchangeTokenInput,
    );
  }
}
