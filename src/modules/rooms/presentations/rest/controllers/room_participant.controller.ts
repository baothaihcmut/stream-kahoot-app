import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UUID } from 'crypto';
import {
  ResponseMessage,
  ResponseStatus,
} from 'src/common/decorators/response.decorator';
import { RoomParticipantUseCase } from 'src/modules/rooms/application/usecase/room_participant.usecase';
import { RestRoomParticipantMapper } from 'src/modules/rooms/infrastructure/mappers/rest/rest_room_participant.mapper';
import { RoomIdParamDTO } from '../dtos/room.dto';
import {
  CreateRoomParticipantRequestDTO,
  CreateRoomParticipantResponseDTO,
} from '../dtos/create_room_participant.dto';
import { CreateRoomParticipantInput } from 'src/modules/rooms/application/presenters/create_room_participant.presenter';
import { ApiBody, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt.guard';
import { ValidateInputPipe } from 'src/common/pipes/validate.pipe';

@Controller('rooms/:id/participants')
@UseGuards(JwtAuthGuard)
export class RoomParticipantController {
  constructor(
    private readonly roomParticipantUseCase: RoomParticipantUseCase,
    private readonly roomParticipantMapper: RestRoomParticipantMapper,
  ) {}

  @Post('/add')
  @ResponseMessage('add room participant success')
  @ResponseStatus(HttpStatus.CREATED)
  @ApiBody({ type: CreateRoomParticipantRequestDTO })
  @ApiOkResponse({ type: CreateRoomParticipantResponseDTO })
  async createRoomParticipant(
    @Param(ValidateInputPipe) pathParam: RoomIdParamDTO,
    @Body(ValidateInputPipe) dto: CreateRoomParticipantRequestDTO,
  ) {
    const result = await this.roomParticipantUseCase.createRoomParticipant(
      new CreateRoomParticipantInput(dto.userId, pathParam.id),
    );
    return this.roomParticipantMapper.toCreateRoomParticipantResponseDTO(
      result,
    );
  }
}
