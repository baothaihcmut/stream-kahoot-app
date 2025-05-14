import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import {
  CreateRoomInput,
  CreateRoomOutput,
} from 'src/modules/rooms/application/presenters/create_room.presenter';
import {
  GetHostRoomInput,
  GetHostRoomOutput,
} from 'src/modules/rooms/application/presenters/get_host_room.presenter';
import { RoomOutput } from 'src/modules/rooms/application/presenters/room.presenter';
import {
  CreateRoomRequestDTO,
  CreateRoomResponseDTO,
} from 'src/modules/rooms/presentations/rest/dtos/create_room.dto';
import {
  GetHostRoomRequestDTO,
  GetHostRoomResponseDTO,
} from 'src/modules/rooms/presentations/rest/dtos/get_host_room.dto';
import { RoomResponseDTO } from 'src/modules/rooms/presentations/rest/dtos/room.dto';

@Injectable()
export class RestRoomMapper extends AutomapperProfile {
  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, RoomOutput, RoomResponseDTO);

      //create room
      createMap(mapper, CreateRoomRequestDTO, CreateRoomInput);
      createMap(mapper, CreateRoomOutput, CreateRoomResponseDTO);

      //get host room
      createMap(mapper, GetHostRoomRequestDTO, GetHostRoomInput);
      createMap(mapper, GetHostRoomOutput, GetHostRoomResponseDTO);
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
  toGetHostRoomInput(request: GetHostRoomRequestDTO): GetHostRoomInput {
    return this.mapper.map(request, GetHostRoomRequestDTO, GetHostRoomInput);
  }
  toGetHostRoomResponseDTO(output: GetHostRoomOutput): GetHostRoomResponseDTO {
    return this.mapper.map(output, GetHostRoomOutput, GetHostRoomResponseDTO);
  }
}
