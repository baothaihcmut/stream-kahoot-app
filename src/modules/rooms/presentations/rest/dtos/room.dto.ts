import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { UUID } from 'crypto';
import { RoomStatus } from 'src/modules/rooms/domain/enums/room_status';

export class RoomIdParamDTO {
  @IsUUID('4', { message: 'room id must be uuid' })
  @IsNotEmpty({ message: 'room id is required' })
  @ApiProperty({ type: String, description: 'must be uuid' })
  id: UUID;
}

export class RoomResponseDTO {
  @AutoMap()
  @ApiProperty({ type: String })
  id: string;

  @AutoMap()
  @ApiProperty({ type: String })
  title: string;

  @AutoMap()
  @ApiProperty({ type: String, required: false })
  description?: string;

  @AutoMap()
  @ApiProperty({ type: String })
  hostId: string;

  @AutoMap()
  @ApiProperty({ type: Date })
  createdAt: Date;

  @AutoMap()
  @ApiProperty({ type: Date })
  startedAt: Date;

  @AutoMap()
  @ApiProperty({ enum: RoomStatus })
  status: RoomStatus;

  @AutoMap()
  @ApiProperty({ type: Number })
  maxParticipant: number;
}
