import { UUID } from 'crypto';

export class RoomParticipant {
  userId: UUID;
  roomId: UUID;
  joinedAt: Date;
  leaveAt?: Date;
  isJoin: boolean;
  constructor(userId: UUID, roomId: UUID) {
    this.userId = userId;
    this.roomId = roomId;
    this.joinedAt = new Date();
    this.isJoin = false;
  }
}
