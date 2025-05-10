import {
  createMap,
  createMapper,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { GoogleExchangeTokenInput } from 'src/modules/auth/application/presenters/google_login.presenter';
import { ExchangeTokenGoogleRequestDTO } from 'src/modules/auth/presentations/rest/dtos/exchange_token_google.dto';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';

@Injectable()
export class GoogleRestMapper extends AutomapperProfile {
  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(
        mapper,
        ExchangeTokenGoogleRequestDTO,
        GoogleExchangeTokenInput,
      );
    };
  }
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  toExchangeGoogleTokenInput(
    dto: ExchangeTokenGoogleRequestDTO,
  ): GoogleExchangeTokenInput {
    return this.mapper.map(
      dto,
      ExchangeTokenGoogleRequestDTO,
      GoogleExchangeTokenInput,
    );
  }
}
