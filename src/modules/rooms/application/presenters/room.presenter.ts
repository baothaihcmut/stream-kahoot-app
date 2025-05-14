import { AutoMap } from '@automapper/classes';
import { Room } from '../../domain/entities/room';
import { RoomStatus } from '../../domain/enums/room_status';

export class RoomOutput {
  @AutoMap()
  id: string;

  @AutoMap()
  title: string;

  @AutoMap()
  description?: string;

  @AutoMap()
  hostId: string;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  startedAt: Date;

  @AutoMap()
  status: RoomStatus;

  @AutoMap()
  maxParticipant: number;

  constructor(room: Room) {
    Object.assign(this, room);
  }
}
