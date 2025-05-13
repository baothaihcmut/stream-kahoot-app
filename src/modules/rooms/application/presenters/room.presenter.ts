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
    this.id = room.id;
    this.title = room.title;
    this.description = room.description;
    this.hostId = room.hostId;
    this.createdAt = room.createdAt;
    this.startedAt = room.startedAt;
    this.status = room.status;
    this.maxParticipant = room.maxParticipant;
  }
}
