import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class RoomParticipantResponseDTO {
  @AutoMap()
  @ApiProperty({ type: String })
  roomId: UUID;

  @AutoMap()
  @ApiProperty({ type: String })
  userId: UUID;

  @AutoMap()
  @ApiProperty({ type: Boolean })
  isJoin: boolean;

  @AutoMap()
  @ApiProperty({ type: Date })
  joinedAt: Date;

  @AutoMap()
  @ApiProperty({ type: Date })
  leaveAt: Date;
}
