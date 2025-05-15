import {
  createMap,
  createMapper,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { GoogleExchangeTokenInput } from 'src/modules/auth/application/presenters/google_login.presenter';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';

@Injectable()
export class GoogleRestMapper extends AutomapperProfile {
  override get profile(): MappingProfile {
    return (mapper) => {};
  }
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
}
