import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { PaginationOutput } from '../output/pagination.output';
import { PaginationResponseDTO } from '../response/pagination.response';

@Injectable()
export class PaginationMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, PaginationOutput, PaginationResponseDTO);
    };
  }
}
