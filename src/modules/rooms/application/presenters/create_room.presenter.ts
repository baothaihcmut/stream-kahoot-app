import { AutoMap } from '@automapper/classes';
import { Room } from '../../domain/entities/room';
import { RoomOutput } from './room.presenter';

export class CreateRoomInput {
  @AutoMap()
  title: string;

  @AutoMap()
  description?: string;

  @AutoMap()
  startedAt: Date;

  @AutoMap()
  maxParticipant: number;
}

export class CreateRoomOutput extends RoomOutput {
  constructor(room: Room) {
    super(room);
  }
}
