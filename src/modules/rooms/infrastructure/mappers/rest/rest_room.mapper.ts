import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import {
  CreateRoomInput,
  CreateRoomOutput,
} from 'src/modules/rooms/application/presenters/create_room.presenter';
import {
  CreateRoomRequestDTO,
  CreateRoomResponseDTO,
} from 'src/modules/rooms/presentations/rest/dtos/create_room.dto';

@Injectable()
export class RestRoomMapper extends AutomapperProfile {
  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, CreateRoomRequestDTO, CreateRoomInput);
      createMap(mapper, CreateRoomOutput, CreateRoomResponseDTO);
    };
  }
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  toCreateRoomInput(request: CreateRoomRequestDTO): CreateRoomInput {
    return this.mapper.map(request, CreateRoomRequestDTO, CreateRoomInput);
  }

  toCreateRoomResponseDTO(output: CreateRoomOutput): CreateRoomResponseDTO {
    return this.mapper.map(output, CreateRoomOutput, CreateRoomResponseDTO);
  }
}
