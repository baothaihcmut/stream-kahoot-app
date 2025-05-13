import {
  Body,
  Controller,
  HttpStatus,
  Injectable,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ResponseMessage,
  ResponseStatus,
} from 'src/common/decorators/response.decorator';
import { RoomUseCase } from 'src/modules/rooms/application/usecase/room.usecase';
import {
  CreateRoomRequestDTO,
  CreateRoomResponseDTO,
} from '../dtos/create_room.dto';
import { ValidateInputPipe } from 'src/common/pipes/validate.pipe';
import { RestRoomMapper } from 'src/modules/rooms/infrastructure/mappers/rest/rest_room.mapper';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt.guard';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('rooms')
export class RoomController {
  constructor(
    private readonly roomUseCase: RoomUseCase,
    private readonly roomMapper: RestRoomMapper,
  ) {}

  @Post('/add')
  @ResponseMessage('create room success')
  @ResponseStatus(HttpStatus.CREATED)
  @UsePipes(ValidateInputPipe)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: CreateRoomResponseDTO })
  async createRoom(
    @Body() request: CreateRoomRequestDTO,
  ): Promise<CreateRoomResponseDTO> {
    const res = await this.roomUseCase.createRoom(
      this.roomMapper.toCreateRoomInput(request),
    );
    return this.roomMapper.toCreateRoomResponseDTO(res);
  }
}
