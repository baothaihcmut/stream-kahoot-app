import { AutoMap } from '@automapper/classes';
import { UUID } from 'crypto';
import { RoomParticipant } from '../../domain/entities/room_participant';

export class RoomParticipantOutput {
  @AutoMap()
  userId: UUID;

  @AutoMap()
  roomId: UUID;

  @AutoMap()
  joinedAt: Date;

  @AutoMap()
  leaveAt?: Date;

  @AutoMap()
  isJoin: boolean;

  constructor(roomParticipant: RoomParticipant) {
    Object.assign(this, roomParticipant);
  }
}
