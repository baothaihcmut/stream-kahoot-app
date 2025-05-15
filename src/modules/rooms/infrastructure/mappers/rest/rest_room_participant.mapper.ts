import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateRoomParticipantOutput } from 'src/modules/rooms/application/presenters/create_room_participant.presenter';
import { RoomParticipantOutput } from 'src/modules/rooms/application/presenters/room_participant.presenter';
import { CreateRoomParticipantResponseDTO } from 'src/modules/rooms/presentations/rest/dtos/create_room_participant.dto';
import { RoomParticipantResponseDTO } from 'src/modules/rooms/presentations/rest/dtos/room_participant.dto';

@Injectable()
export class RestRoomParticipantMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, RoomParticipantOutput, RoomParticipantResponseDTO);

      createMap(
        mapper,
        CreateRoomParticipantOutput,
        CreateRoomParticipantResponseDTO,
      );
    };
  }

  toCreateRoomParticipantResponseDTO(
    output: CreateRoomParticipantOutput,
  ): CreateRoomParticipantResponseDTO {
    return this.mapper.map(
      output,
      CreateRoomParticipantOutput,
      CreateRoomParticipantResponseDTO,
    );
  }
}
