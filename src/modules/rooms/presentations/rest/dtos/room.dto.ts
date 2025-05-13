import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { RoomStatus } from 'src/modules/rooms/domain/enums/room_status';

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
