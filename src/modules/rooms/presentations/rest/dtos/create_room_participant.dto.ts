import { Type } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { UUID } from 'crypto';
import { RoomParticipantResponseDTO } from './room_participant.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomParticipantRequestDTO {
  @IsUUID('4', { message: 'user id must be uuid' })
  @IsNotEmpty({ message: 'user id is required' })
  @ApiProperty({ type: String, description: 'must be uuid' })
  userId: UUID;
}

export class CreateRoomParticipantResponseDTO extends RoomParticipantResponseDTO {}
