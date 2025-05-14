import { UUID } from 'crypto';

export class RoomParticipant {
  constructor(
    public userId: UUID,
    public roomId: UUID,
    public isJoin: boolean,
    public joinedAt?: Date,
    public leaveAt?: Date,
  ) {}
  static newRoomParticipant(userId: UUID, roomId: UUID): RoomParticipant {
    return new RoomParticipant(userId, roomId, false, null, null);
  }
}
